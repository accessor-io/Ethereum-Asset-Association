
const hre = require("hardhat");

async function main() {
  const Schedule = await hre.ethers.getContractFactory("Schedule");
  const schedule = await Schedule.deploy();

  await schedule.deployed();

  console.log("Schedule deployed to:", schedule.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

