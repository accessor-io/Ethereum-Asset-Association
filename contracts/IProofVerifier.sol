// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface IProofVerifier {
    function verifyProof(bytes calldata proof) external view returns (bool);
}
