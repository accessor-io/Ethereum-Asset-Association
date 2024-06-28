const { expect } = require('chai');
describe('Focused Contract Tests', function () {
  it('AttestationManager should be deployed successfully', async function () {
    const AttestationManager = await ethers.getContractFactory('AttestationManager');
    const attestationManager = await AttestationManager.deploy();
    await attestationManager.deployed();
    expect(attestationManager.address).to.properAddress;
  });

  it('Registry should be deployed successfully', async function () {
    const Registry = await ethers.getContractFactory('Registry');
    const registry = await Registry.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3');
    await registry.deployed();
    expect(registry.address).to.properAddress;
  });

  it('Resolver should be deployed successfully', async function () {
    const Resolver = await ethers.getContractFactory('Resolver');
    const resolver = await Resolver.deploy();
    await resolver.deployed();
    expect(resolver.address).to.properAddress;
  });
});
