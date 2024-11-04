const hre = require("hardhat");

async function main() {
  const ChainlinkCCIP = await hre.ethers.getContractFactory("ChainlinkCCIPImplementation");
  const chainlinkCCIP = await ChainlinkCCIP.deploy();

  await chainlinkCCIP.deployed();

  console.log("ChainlinkCCIPImplementation deployed to:", chainlinkCCIP.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

