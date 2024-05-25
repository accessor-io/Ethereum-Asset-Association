// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IResolver.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Resolver is IResolver, AccessControl {
    bytes32 public constant PIVOT_ROLE = keccak256("PIVOT_ROLE");

    struct Group {
        address pivot;
        mapping(address => string) addressDetails;
        address[] addresses;
    }

    mapping(bytes32 => Group) private groups;

    event AddressAdded(bytes32 indexed hash, address indexed addr, string detail);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setRoleAdmin(PIVOT_ROLE, DEFAULT_ADMIN_ROLE);
    }

    function addAddress(bytes32 hash, address addr, string memory detail) external override onlyRole(PIVOT_ROLE) {
        Group storage group = groups[hash];
        if (group.pivot == address(0)) {
            group.pivot = msg.sender;
        }
        group.addresses.push(addr);
        group.addressDetails[addr] = detail;
        emit AddressAdded(hash, addr, detail);
    }

    function getAddressDetails(bytes32 hash, address addr) external view override returns (string memory) {
        return groups[hash].addressDetails[addr];
    }

    function getAddresses(bytes32 hash) external view returns (address[] memory) {
        return groups[hash].addresses;
    }
}

