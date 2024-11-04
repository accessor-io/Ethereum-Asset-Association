
const hre = require("hardhat");

async function main() {
  const SimpleAttestation = await hre.ethers.getContractFactory("SimpleAttestation");
  const simpleAttestation = await SimpleAttestation.deploy();

  await simpleAttestation.deployed();

  console.log("SimpleAttestation deployed to:", simpleAttestation.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

