
const hre = require("hardhat");

async function main() {
  const AddressRegistry = await hre.ethers.getContractFactory("AddressRegistry");
  const addressRegistry = await AddressRegistry.deploy();

  await addressRegistry.deployed();

  console.log("AddressRegistry deployed to:", addressRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

