
const hre = require("hardhat");

async function main() {
  const Resolver = await hre.ethers.getContractFactory("Resolver");
  const resolver = await Resolver.deploy();

  await resolver.deployed();

  console.log("Resolver deployed to:", resolver.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

