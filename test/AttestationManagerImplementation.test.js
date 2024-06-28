const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AttestationManagerImplementation', function () {
  let Contract;
  let contract;
  let owner, addr1, addr2;

  before(async function () {
    const { expect } = await import('chai');
    global.expect = expect;
  });

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    Contract = await ethers.getContractFactory('AttestationManagerImplementation');
    contract = await Contract.deploy(); // Add arguments if necessary
    await contract.deployed();
  });

  it('should deploy successfully', async function () {
    expect(ethers.utils.isAddress(contract.address)).to.be.true;
  });

});
