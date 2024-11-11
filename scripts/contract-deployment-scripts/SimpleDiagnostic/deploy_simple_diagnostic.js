
const hre = require("hardhat");

async function main() {
  const SimpleDiagnostic = await hre.ethers.getContractFactory("SimpleDiagnostic");
  const simpleDiagnostic = await SimpleDiagnostic.deploy();

  await simpleDiagnostic.deployed();

  console.log("SimpleDiagnostic deployed to:", simpleDiagnostic.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

