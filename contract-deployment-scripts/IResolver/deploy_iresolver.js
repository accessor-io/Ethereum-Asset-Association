
const hre = require("hardhat");

async function main() {
  const IResolver = await hre.ethers.getContractFactory("IResolver");
  const iResolver = await IResolver.deploy();

  await iResolver.deployed();

  console.log("IResolver deployed to:", iResolver.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

