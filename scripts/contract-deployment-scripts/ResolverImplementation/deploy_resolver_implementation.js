
const hre = require("hardhat");

async function main() {
  const ResolverImplementation = await hre.ethers.getContractFactory("ResolverImplementation");
  const resolverImplementation = await ResolverImplementation.deploy();

  await resolverImplementation.deployed();

  console.log("ResolverImplementation deployed to:", resolverImplementation.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

