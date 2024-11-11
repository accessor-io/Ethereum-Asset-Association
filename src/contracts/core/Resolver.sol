// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Resolver is AccessControl {
    bytes32 public constant RESOLVER_ROLE = keccak256("RESOLVER_ROLE");

    mapping(bytes32 => address) private addresses;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(RESOLVER_ROLE, msg.sender);
    }

    function setAddress(bytes32 name, address addr) external onlyRole(RESOLVER_ROLE) {
        addresses[name] = addr;
    }

    function getAddress(bytes32 name) external view returns (address) {
        return addresses[name];
    }
}
