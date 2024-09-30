// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

interface IEASInterface {
    function attest(address attester, bytes32 hash, bytes memory data) external returns (bytes32);
    function verify(bytes32 attestationId, bytes32 hash) external view returns (bool);
}

contract AttestationManager is Ownable, Pausable, AccessControlEnumerable {
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant PIVOT_ROLE = keccak256("PIVOT_ROLE");
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");

    IEASInterface public eas;
    uint256 public registrationFee;
    address public feeCollector;

    struct Attestation {
        address pivot;
        EnumerableSet.AddressSet addresses;
        mapping(address => string) details;
    }

    mapping(bytes32 => Attestation) private attestations;

    event AttestationCreated(bytes32 indexed hash, address indexed pivot);
    event AddressAdded(bytes32 indexed hash, address indexed addedBy, address addr);
    event AddressRemoved(bytes32 indexed hash, address indexed removedBy, address addr);
    event EmergencyBreak(bytes32 indexed hash, address indexed by);

    constructor(address easAddress, uint256 fee, address collector) {
        eas = IEASInterface(easAddress);
        registrationFee = fee;
        feeCollector = collector;
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setRoleAdmin(PIVOT_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(EMERGENCY_ROLE, DEFAULT_ADMIN_ROLE);
    }

    modifier collectFee() {
        require(msg.value >= registrationFee, "Insufficient fee");
        _;
        payable(feeCollector).transfer(msg.value);
    }

    function createAttestation(bytes32 hash, address[] memory initialAddresses, string[] memory details) external payable onlyRole(PIVOT_ROLE) collectFee {
        require(attestations[hash].pivot == address(0), "Attestation already exists");
        require(initialAddresses.length == details.length, "Mismatched inputs");

        Attestation storage attestation = attestations[hash];
        attestation.pivot = _msgSender();

        for (uint256 i = 0; i < initialAddresses.length; i++) {
            attestation.addresses.add(initialAddresses[i]);
            attestation.details[initialAddresses[i]] = details[i];
        }

        bytes memory data = abi.encode(initialAddresses, details);
        eas.attest(_msgSender(), hash, data);

        emit AttestationCreated(hash, _msgSender());
    }

    function addAddress(bytes32 hash, address addr, string memory detail) external onlyRole(PIVOT_ROLE) {
        Attestation storage attestation = attestations[hash];
        require(attestation.pivot == _msgSender(), "Not authorized");

        attestation.addresses.add(addr);
        attestation.details[addr] = detail;

        bytes memory data = abi.encode(addr, detail);
        eas.attest(_msgSender(), hash, data);

        emit AddressAdded(hash, _msgSender(), addr);
    }

    function removeAddress(bytes32 hash, address addr) external onlyRole(PIVOT_ROLE) {
        Attestation storage attestation = attestations[hash];
        require(attestation.pivot == _msgSender(), "Not authorized");

        attestation.addresses.remove(addr);

        emit AddressRemoved(hash, _msgSender(), addr);
    }

    function triggerEmergencyBreak(bytes32 hash) external onlyRole(EMERGENCY_ROLE) {
        Attestation storage attestation = attestations[hash];
        require(attestation.pivot != address(0), "Invalid attestation");

        _pause();
        delete attestations[hash];

        emit EmergencyBreak(hash, _msgSender());
    }

    function getAddresses(bytes32 hash) external view returns (address[] memory) {
        Attestation storage attestation = attestations[hash];
        require(attestation.pivot != address(0), "Invalid attestation");

        uint256 length = attestation.addresses.length();
        address[] memory addresses = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            addresses[i] = attestation.addresses.at(i);
        }
        return addresses;
    }

    function getDetails(bytes32 hash, address addr) external view returns (string memory) {
        Attestation storage attestation = attestations[hash];
        require(attestation.pivot != address(0), "Invalid attestation");

        return attestation.details[addr];
    }

    function verifyAttestation(bytes32 attestationId, bytes32 hash) external view returns (bool) {
        return eas.verify(attestationId, hash);
    }

    function updateRegistrationFee(uint256 newFee) external onlyOwner {
        registrationFee = newFee;
    }

    function updateFeeCollector(address newCollector) external onlyOwner {
        feeCollector = newCollector;
    }
}
