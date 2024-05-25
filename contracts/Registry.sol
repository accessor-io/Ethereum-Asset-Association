// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IRegistry.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Registry is IRegistry, Ownable {
    mapping(bytes32 => address) private resolvers;

    event Registered(bytes32 indexed hash, address resolver);

    function register(bytes32 hash, address resolver) external onlyOwner override {
        require(resolvers[hash] == address(0), "Already registered");
        resolvers[hash] = resolver;
        emit Registered(hash, resolver);
    }

    function getResolver(bytes32 hash) external view override returns (address) {
        return resolvers[hash];
    }
}

