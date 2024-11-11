
const hre = require("hardhat");

async function main() {
  const DiagnosticEvents = await hre.ethers.getContractFactory("DiagnosticEvents");
  const diagnosticEvents = await DiagnosticEvents.deploy();

  await diagnosticEvents.deployed();

  console.log("DiagnosticEvents deployed to:", diagnosticEvents.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

