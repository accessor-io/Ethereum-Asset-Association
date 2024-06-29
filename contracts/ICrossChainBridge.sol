// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICrossChainBridge {
    function bridgeTokens(address token, uint256 amount, address recipient, uint256 destinationChainId) external;
}
