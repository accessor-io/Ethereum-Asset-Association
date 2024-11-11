require("@nomiclabs/hardhat-waffle");


task("interact", "Interacts with the AttestationManager contract", async (taskArgs, hre) => {
    const ethers = hre.ethers;

    const contractAddress = "0xAttestationManagerAddress"; // Replace with actual deployed address
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

    const [signer] = await ethers.getSigners();
    const attestationManager = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const attestationCount = await attestationManager.getAttestationCount();
        console.log("Attestation Count:", attestationCount.toString());
    } catch (error) {
        console.error("Error interacting with the contract:", error);
    }
});

module.exports = {
    solidity: "0.8.4",
};
