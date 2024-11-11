// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SchemaRegistry is AccessControl {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");

    struct Schema {
        bytes32 name;
        string schema;
    }

    mapping(bytes32 => Schema) private schemas;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REGISTRAR_ROLE, msg.sender);
    }

    function registerSchema(bytes32 name, string memory schema) external onlyRole(REGISTRAR_ROLE) {
        schemas[name] = Schema({ name: name, schema: schema });
    }

    function getSchema(bytes32 name) external view returns (Schema memory) {
        return schemas[name];
    }
}
