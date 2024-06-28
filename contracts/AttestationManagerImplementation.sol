// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./IAttestationManager.sol";

contract AttestationManagerImplementation is IAttestationManager {
    mapping(address => bytes32) private attestations;

    // Function to set an attestation
    function setAttestation(address subject, bytes32 data) external {
        attestations[subject] = data;
    }

    // Function to get an attestation
    function getAttestation(address subject) external view returns (bytes32) {
        return attestations[subject];
    }
}
