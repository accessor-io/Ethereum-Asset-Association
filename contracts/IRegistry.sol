// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRegistry {
    function register(bytes32 hash, address resolver) external;
    function getResolver(bytes32 hash) external view returns (address);
}

