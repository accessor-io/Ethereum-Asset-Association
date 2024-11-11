
const hre = require("hardhat");

async function main() {
  const AttestationManagerImplementation = await hre.ethers.getContractFactory("AttestationManagerImplementation");
  const attestationManagerImplementation = await AttestationManagerImplementation.deploy();

  await attestationManagerImplementation.deployed();

  console.log("AttestationManagerImplementation deployed to:", attestationManagerImplementation.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

