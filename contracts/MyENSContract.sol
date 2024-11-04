// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MyENSContract is Ownable, ReentrancyGuard, Pausable {
    // Your contract code

    // Example: Efficient data structures
    mapping(string => string) private ensNames;

    function setName(string calldata ensName, string calldata value) external onlyOwner {
        ensNames[ensName] = value;
    }

    function getName(string calldata ensName) external view returns (string memory) {
        return ensNames[ensName];
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}