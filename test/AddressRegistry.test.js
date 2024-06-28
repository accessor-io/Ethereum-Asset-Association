const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AddressRegistry', function () {
  let AddressRegistry;
  let addressRegistry;
  let owner, addr1, addr2;

  before(async function () {
    const { expect } = await import('chai');
    global.expect = expect;
  });

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    AddressRegistry = await ethers.getContractFactory('AddressRegistry');
    addressRegistry = await AddressRegistry.deploy();
    await addressRegistry.deployed();
  });

  it('should deploy successfully', async function () {
    expect(ethers.utils.isAddress(addressRegistry.address)).to.be.true;
  });

  it('should register an address', async function () {
    await addressRegistry.registerAddress(addr1.address, "Label1");
    const label = await addressRegistry.addressToLabel(addr1.address);
    expect(label).to.equal("Label1");
  });

  it('should update an address', async function () {
    await addressRegistry.registerAddress(addr1.address, "Label1");
    await addressRegistry.updateAddressLabel(addr1.address, "Label2");
    const label = await addressRegistry.addressToLabel(addr1.address);
    expect(label).to.equal("Label2");
  });

  it('should deregister an address', async function () {
    await addressRegistry.registerAddress(addr1.address, "Label1");
    await addressRegistry.deregisterAddress(addr1.address);
    const label = await addressRegistry.addressToLabel(addr1.address);
    expect(label).to.equal("");
  });
});
