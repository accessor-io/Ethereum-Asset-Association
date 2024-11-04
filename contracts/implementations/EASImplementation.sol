// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./IEAS.sol";

contract EASImplementation is IEAS {
    // Mapping to store attestations
    mapping(uint256 => bytes32) private attestations;

    constructor() {
        // Example attestations (In actual implementation, this data might come from somewhere else)
        attestations[1] = keccak256(abi.encodePacked("example hash 1"));
        attestations[2] = keccak256(abi.encodePacked("example hash 2"));
    }

    function verify(uint256 attestationId, bytes32 hash) external view returns (bool) {
        return attestations[attestationId] == hash;
    }
}

