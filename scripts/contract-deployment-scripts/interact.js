const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const contractAddress = "0xAttestationManagerAddress"; // Replace with the actual deployed address
    const contractABI = [ 
        {
            "inputs": [],
            "name": "getAttestationCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Use Hardhat's network and signer
    const [signer] = await ethers.getSigners();
    const attestationManager = new ethers.Contract(contractAddress, contractABI, signer);

    // Example Interaction: Calling a function named `getAttestationCount`
    try {
        const attestationCount = await attestationManager.getAttestationCount();
        console.log("Attestation Count:", attestationCount.toString());
    } catch (error) {
        console.error("Error interacting with the contract:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
