const hre = require("hardhat");

async function main() {
  const CrossChainBridge = await hre.ethers.getContractFactory("CrossChainBridgeImplementation");
  const crossChainBridge = await CrossChainBridge.deploy();

  await crossChainBridge.deployed();

  console.log("CrossChainBridgeImplementation deployed to:", crossChainBridge.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

