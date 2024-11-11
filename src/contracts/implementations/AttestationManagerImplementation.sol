// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract AttestationManagerImplementation is AccessControl {
    bytes32 public constant ATTESTOR_ROLE = keccak256("ATTESTOR_ROLE");

    struct Attestation {
        address subject;
        bytes32 data;
    }

    mapping(address => Attestation) private attestations;

    event AttestationCreated(address indexed subject, bytes32 data);
    event AttestationUpdated(address indexed subject, bytes32 data);
    event AttestationRemoved(address indexed subject);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ATTESTOR_ROLE, msg.sender);
    }

    function createAttestation(address subject, bytes32 data) external onlyRole(ATTESTOR_ROLE) {
        attestations[subject] = Attestation({ subject: subject, data: data });
        emit AttestationCreated(subject, data);
    }

    function getAttestation(address subject) external view returns (Attestation memory) {
        return attestations[subject];
    }

    function updateAttestation(address subject, bytes32 data) external onlyRole(ATTESTOR_ROLE) {
        require(attestations[subject].subject != address(0), "Attestation does not exist");
        attestations[subject].data = data;
        emit AttestationUpdated(subject, data);
    }

    function removeAttestation(address subject) external onlyRole(ATTESTOR_ROLE) {
        require(attestations[subject].subject != address(0), "Attestation does not exist");
        delete attestations[subject];
        emit AttestationRemoved(subject);
    }
}
