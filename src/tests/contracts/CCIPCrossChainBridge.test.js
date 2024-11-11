const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('CCIPCrossChainBridge', function () {
  let CCIPCrossChainBridge;
  let ccipCrossChainBridge;
  let owner, addr1, addr2;

  before(async function () {
    const { expect } = await import('chai');
    global.expect = expect;
  });

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    CCIPCrossChainBridge = await ethers.getContractFactory('CCIPCrossChainBridge');
    ccipCrossChainBridge = await CCIPCrossChainBridge.deploy();
    await ccipCrossChainBridge.deployed();
  });

  it('should deploy successfully', async function () {
    expect(ethers.utils.isAddress(ccipCrossChainBridge.address)).to.be.true;
  });

  it('should initiate a cross-chain transfer', async function () {
    // Example test case
    await ccipCrossChainBridge.initiateCrossChainTransfer(addr1.address, 1000);
    const balance = await ccipCrossChainBridge.getCrossChainBalance(addr1.address);
    expect(balance).to.equal(1000); // Check appropriate logic
  });

});
