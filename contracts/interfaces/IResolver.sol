// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IResolver {
    function addAddress(bytes32 hash, address addr, string memory detail) external;
    function getAddressDetails(bytes32 hash, address addr) external view returns (string memory);
}

