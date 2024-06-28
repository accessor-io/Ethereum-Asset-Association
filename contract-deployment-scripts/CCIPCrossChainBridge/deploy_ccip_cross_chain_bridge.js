
const hre = require("hardhat");

async function main() {
  const CCIPCrossChainBridge = await hre.ethers.getContractFactory("CCIPCrossChainBridge");
  const ccipCrossChainBridge = await CCIPCrossChainBridge.deploy();

  await ccipCrossChainBridge.deployed();

  console.log("CCIPCrossChainBridge deployed to:", ccipCrossChainBridge.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

