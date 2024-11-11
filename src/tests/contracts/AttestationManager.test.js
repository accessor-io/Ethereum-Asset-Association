const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AttestationManager', function () {
  let AttestationManager;
  let attestationManager;
  let owner, addr1, addr2;

  before(async function () {
    const { expect } = await import('chai');
    global.expect = expect;
  });

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    AttestationManager = await ethers.getContractFactory('AttestationManager');
    attestationManager = await AttestationManager.deploy();
    await attestationManager.deployed();
  });

  it('should deploy successfully', async function () {
    expect(ethers.utils.isAddress(attestationManager.address)).to.be.true;
  });

  // Example of a detailed test case
  it('should create attestation', async function () {
    const schemaId = 1;
    const data = 'Sample Data';
    await attestationManager.createAttestation(schemaId, data);
    const attestation = await attestationManager.getAttestation(schemaId, addr1.address);
    expect(attestation.data).to.equal(data);
  });


});
