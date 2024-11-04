// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Oracle is AccessControl {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    mapping(bytes32 => uint256) private data;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
    }

    function setData(bytes32 key, uint256 value) external onlyRole(ORACLE_ROLE) {
        data[key] = value;
    }

    function getData(bytes32 key) external view returns (uint256) {
        return data[key];
    }
}
