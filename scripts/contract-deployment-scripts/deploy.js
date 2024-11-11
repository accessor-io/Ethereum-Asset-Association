const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy AttestationManager if required
  const AttestationManager = await hre.ethers.getContractFactory("AttestationManager");
  const attestationManager = await AttestationManager.deploy();
  await attestationManager.deployed();
  console.log("AttestationManager deployed to:", attestationManager.address);

  // Deploy Registry
  const Registry = await hre.ethers.getContractFactory("Registry");
  const registry = await Registry.deploy(attestationManager.address); // Assuming it takes address of AttestationManager
  await registry.deployed();
  console.log("Registry deployed to:", registry.address);

  // Deploy Resolver
  const Resolver = await hre.ethers.getContractFactory("Resolver");
  const resolver = await Resolver.deploy();
  await resolver.deployed();
  console.log("Resolver deployed to:", resolver.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
