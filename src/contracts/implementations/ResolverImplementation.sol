// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./IResolver.sol";

contract ResolverImplementation is IResolver {
    mapping(bytes32 => mapping(address => string)) private addressDetails;

    function addAddress(bytes32 hash, address addr, string memory detail) public {
        addressDetails[hash][addr] = detail;
    }

    function getAddressDetails(bytes32 hash, address addr) public view returns (string memory) {
        return addressDetails[hash][addr];
    }
}

