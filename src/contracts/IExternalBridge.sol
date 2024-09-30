// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface IExternalBridge {
    function sendData(address destinationChain, bytes calldata data) external;
}
