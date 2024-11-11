const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PermissionRegistry', function () {
  let PermissionRegistry;
  let permissionRegistry;
  let owner, addr1, addr2;

  before(async function () {
    const { expect } = await import('chai');
    global.expect = expect;
  });

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    PermissionRegistry = await ethers.getContractFactory('PermissionRegistry');
    permissionRegistry = await PermissionRegistry.deploy();
    await permissionRegistry.deployed();
  });

  it('should deploy successfully', async function () {
    expect(ethers.utils.isAddress(permissionRegistry.address)).to.be.true;
  });

  it('should grant permission', async function () {
    const permissionId = 1;
    await permissionRegistry.grantPermission(addr1.address, permissionId);
    const hasPermission = await permissionRegistry.hasPermission(addr1.address, permissionId);
    expect(hasPermission).to.be.true; // Check specific logic to be validated
  });

});
