
const hre = require("hardhat");

async function main() {
  const ProjectRegistry = await hre.ethers.getContractFactory("ProjectRegistry");
  const projectRegistry = await ProjectRegistry.deploy();

  await projectRegistry.deployed();

  console.log("ProjectRegistry deployed to:", projectRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

