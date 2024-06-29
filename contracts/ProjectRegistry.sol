// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract ProjectRegistry is AccessControl {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");

    struct Project {
        bytes32 name;
        address owner;
    }

    mapping(bytes32 => Project) private projects;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(REGISTRAR_ROLE, msg.sender);
    }

    function registerProject(bytes32 name, address owner) external onlyRole(REGISTRAR_ROLE) {
        projects[name] = Project({ name: name, owner: owner });
    }

    function getProject(bytes32 name) external view returns (Project memory) {
        return projects[name];
    }
}
