
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@ensdomains/ens/contracts/ENS.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract AttestationService is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    struct Association {
        address owner;
        string ensName;
        bytes entityData;
        uint256 timestamp;
    }

    mapping(address => Association) public addressToAssociation;
    address public admin;

    constructor() {
        admin = msg.sender;
        setPublicChainlinkToken();
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    event AssociationAdded(address indexed owner, string ensName, uint256 timestamp);
    event AssociationRemoved(address indexed owner);
    event BatchSigned(address[] indexed owners);
    event CrossChainCommunication(string message);

    function addAttestation(address _owner, string memory _ensName, bytes memory _entityData) public onlyAdmin {
        addressToAssociation[_owner] = Association(_owner, _ensName, _entityData, block.timestamp);
        emit AssociationAdded(_owner, _ensName, block.timestamp);
    }

    function removeAttestation(address _owner) public onlyAdmin {
        delete addressToAssociation[_owner];
        emit AssociationRemoved(_owner);
    }

    function verifyAttestation(address _owner) public view returns (bool) {
        return addressToAssociation[_owner].owner != address(0);
    }

    function signBatch(address[] memory _owners) public onlyAdmin {
        emit BatchSigned(_owners);
    }

    function requestCrossChainCommunication(string memory message, address oracle, bytes32 jobId, uint256 fee) public onlyAdmin {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("message", message);
        sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, string memory message) public recordChainlinkFulfillment(_requestId) {
        emit CrossChainCommunication(message);
    }
}
