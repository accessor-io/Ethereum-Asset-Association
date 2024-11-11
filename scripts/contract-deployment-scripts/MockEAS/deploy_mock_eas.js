
const hre = require("hardhat");

async function main() {
  const MockEAS = await hre.ethers.getContractFactory("MockEAS");
  const mockEAS = await MockEAS.deploy();

  await mockEAS.deployed();

  console.log("MockEAS deployed to:", mockEAS.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

