
const hre = require("hardhat");

async function main() {
  const AttestationRegistry = await hre.ethers.getContractFactory("AttestationRegistry");
  const attestationRegistry = await AttestationRegistry.deploy();

  await attestationRegistry.deployed();

  console.log("AttestationRegistry deployed to:", attestationRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

