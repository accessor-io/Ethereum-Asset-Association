// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IProofVerifier {
    function verifyProof(bytes calldata proof) external view returns (bool);
}
