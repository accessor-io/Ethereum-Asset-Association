// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IChainlinkCCIP {
    function sendData(address destinationChain, bytes calldata data) external;
    function receiveData(bytes calldata data) external;
}
