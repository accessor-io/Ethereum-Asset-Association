
const hre = require("hardhat");

async function main() {
  const GovernorContract = await hre.ethers.getContractFactory("GovernorContract");
  const governorContract = await GovernorContract.deploy();

  await governorContract.deployed();

  console.log("GovernorContract deployed to:", governorContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

