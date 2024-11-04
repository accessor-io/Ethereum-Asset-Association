
const hre = require("hardhat");

async function main() {
  const Registry = await hre.ethers.getContractFactory("Registry");
  const registry = await Registry.deploy("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");

  await registry.deployed();

  console.log("Registry deployed to:", registry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

