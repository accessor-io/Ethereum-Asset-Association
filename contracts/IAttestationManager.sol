// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAttestationManager {
    function createAttestation(address subject, bytes32 data) external;
    function getAttestation(address subject) external view returns (bytes32);
}
