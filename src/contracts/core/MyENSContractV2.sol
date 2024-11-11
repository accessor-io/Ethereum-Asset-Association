// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyENSContractV2 is Initializable, OwnableUpgradeable {
    // State variables and new functionalities

    function initialize() public initializer {
        __Ownable_init();
    }

    // New functions
}