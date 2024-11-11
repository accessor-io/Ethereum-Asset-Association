const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Governor', function () {
  let Governor;
  let governor;
  let owner, addr1, addr2;

  before(async function () {
    const { expect } = await import('chai');
    global.expect = expect;
  });

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    Governor = await ethers.getContractFactory('Governor');
    governor = await Governor.deploy();
    await governor.deployed();
  });

  it('should deploy successfully', async function () {
    expect(ethers.utils.isAddress(governor.address)).to.be.true;
  });

  it('should create a proposal', async function () {
    const proposalId = 1;
    await governor.createProposal(proposalId, "Proposal Description", [addr1.address], ["0x00"]);
    const proposal = await governor.proposals(proposalId);
    expect(proposal.id).to.equal(proposalId);
  });

});
