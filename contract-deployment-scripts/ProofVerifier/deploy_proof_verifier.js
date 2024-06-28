
const hre = require("hardhat");

async function main() {
  const ProofVerifier = await hre.ethers.getContractFactory("ProofVerifier");
  const proofVerifier = await ProofVerifier.deploy();

  await proofVerifier.deployed();

  console.log("ProofVerifier deployed to:", proofVerifier.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

