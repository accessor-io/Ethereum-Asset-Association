const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Multisend', function () {
  let Multisend;
  let multisend;
  let owner, addr1, addr2;

  before(async function () {
    const { expect } = await import('chai');
    global.expect = expect;
  });

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    Multisend = await ethers.getContractFactory('Multisend');
    multisend = await Multisend.deploy();
    await multisend.deployed();
  });

  it('should deploy successfully', async function () {
    expect(ethers.utils.isAddress(multisend.address)).to.be.true;
  });

  it('should send tokens to multiple addresses', async function () {
    const recipients = [addr1.address, addr2.address];
    const amounts = [1000, 2000];
    await multisend.multiSend(recipients, amounts);
    const balance1 = await multisend.getBalance(addr1.address);
    const balance2 = await multisend.getBalance(addr2.address);
    expect(balance1).to.equal(1000);
    expect(balance2).to.equal(2000);
  });

});
