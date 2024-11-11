const express = require('express');
const bodyParser = require('body-parser');
const ethers = require('ethers');
const EAS = require('./eas-sdk');  // Adjust this path based on the actual SDK location

const app = express();
app.use(bodyParser.json());

const easAddress = 'YOUR_EAS_CONTRACT_ADDRESS';
const provider = new ethers.providers.InfuraProvider('rinkeby', 'YOUR_INFURA_API_KEY');
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
const eas = new EAS(wallet, easAddress);

let walletLabels = {};

app.post('/attest', async (req, res) => {
    const { hash, addresses, details } = req.body;
    if (!hash || !addresses || !details || addresses.length !== details.length) {
        return res.status(400).send('Invalid request');
    }

    walletLabels[hash] = { addresses, details };

    try {
        const data = ethers.utils.defaultAbiCoder.encode(['address[]', 'string[]'], [addresses, details]);
        const attestationId = await eas.attest(wallet.address, hash, data);
        res.status(200).send(`Attestation stored and on-chain attestation created with ID: ${attestationId}`);
    } catch (error) {
        console.error('Error creating attestation:', error);
        res.status(500).send('Error creating attestation');
    }
});

app.get('/resolve/:hash', (req, res) => {
    const hash = req.params.hash;
    const attestation = walletLabels[hash];

    if (!attestation) {
        return res.status(404).send('Attestation not found');
    }

    res.status(200).json(attestation);
});

app.get('/label/:address', (req, res) => {
    const { address } = req.params;
    for (const [hash, attestation] of Object.entries(walletLabels)) {
        const index = attestation.addresses.indexOf(address);
        if (index > -1) {
            return res.status(200).json({ hash, detail: attestation.details[index] });
        }
    }
    res.status(404).send('Label not found');
});

app.get('/verify/:attestationId/:hash', async (req, res) => {
    const { attestationId, hash } = req.params;
    try {
        const isValid = await eas.verify(attestationId, hash);
        res.status(200).json({ valid: isValid });
    } catch (error) {
        console.error('Error verifying attestation:', error);
        res.status(500).send('Error verifying attestation');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
