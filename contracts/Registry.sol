// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./AttestationManager.sol";

contract Registry is Ownable, AccessControlEnumerable {
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Registration {
        address registrant;
        bytes32 attestationHash;
    }

    mapping(bytes32 => Registration) private registrations;

    event Registered(bytes32 indexed hash, address indexed registrant, bytes32 attestationHash);
    event Unregistered(bytes32 indexed hash, address indexed unregistrant);

    AttestationManager public attestationManager;

    constructor(address attestationManagerAddress) {
        attestationManager = AttestationManager(attestationManagerAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setRoleAdmin(ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }

    function register(bytes32 hash, bytes32 attestationHash) external onlyAdmin {
        require(registrations[hash].registrant == address(0), "Hash already registered");

        registrations[hash] = Registration({
            registrant: msg.sender,
            attestationHash: attestationHash
        });

        emit Registered(hash, msg.sender, attestationHash);
    }

    function unregister(bytes32 hash) external onlyAdmin {
        require(registrations[hash].registrant != address(0), "Hash not registered");

        address registrant = registrations[hash].registrant;
        delete registrations[hash];

        emit Unregistered(hash, registrant);
    }

    function getRegistration(bytes32 hash) external view returns (address registrant, bytes32 attestationHash) {
        require(registrations[hash].registrant != address(0), "Hash not registered");

        Registration storage registration = registrations[hash];
        return (registration.registrant, registration.attestationHash);
    }

    function updateAttestationManager(address newAttestationManager) external onlyOwner {
        attestationManager = AttestationManager(newAttestationManager);
    }
}
