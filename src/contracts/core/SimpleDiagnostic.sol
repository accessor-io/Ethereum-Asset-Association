
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SimpleDiagnostic is AccessControl {
    bytes32 public constant DIAGNOSTIC_ROLE = keccak256("DIAGNOSTIC_ROLE");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(DIAGNOSTIC_ROLE, _msgSender());
    }

    // Other functions relevant to SimpleDiagnostic
}
