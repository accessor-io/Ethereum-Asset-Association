// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyENSNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("MyENS NFT", "ENSNFT") {
        tokenCounter = 0;
    }

    function createENS(string memory ensName) external onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        tokenCounter += 1;
        return newTokenId;
    }
}