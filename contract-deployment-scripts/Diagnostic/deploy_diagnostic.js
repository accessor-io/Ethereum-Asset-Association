
const hre = require("hardhat");

async function main() {
  const Diagnostic = await hre.ethers.getContractFactory("Diagnostic");
  const diagnostic = await Diagnostic.deploy();

  await diagnostic.deployed();

  console.log("Diagnostic deployed to:", diagnostic.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

