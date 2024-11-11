
const hre = require("hardhat");

async function main() {
  const AttestationManager = await hre.ethers.getContractFactory("AttestationManager");
  const attestationManager = await AttestationManager.deploy("0x0000000000000000000000000000000000000001", 1000, "0x0000000000000000000000000000000000000002");

  await attestationManager.deployed();

  console.log("AttestationManager deployed to:", attestationManager.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

