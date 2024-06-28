
const hre = require("hardhat");

async function main() {
  const SchemaRegistry = await hre.ethers.getContractFactory("SchemaRegistry");
  const schemaRegistry = await SchemaRegistry.deploy();

  await schemaRegistry.deployed();

  console.log("SchemaRegistry deployed to:", schemaRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

