// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract TestTestAddressRegistry {
    struct AddressInfo {
        address addr;
        bool isContract;
        bool isProxy;
    }

    struct AddressStructure {
        AddressInfo[] addresses;
        bool isEditable;
    }

    mapping(address => AddressStructure) private structures;
    mapping(address => bool) private structureExists;

    event StructureCreated(address indexed creator);
    event AddressAdded(address indexed creator, address indexed addr, bool isContract, bool isProxy);
    event AddressUpdated(address indexed creator, uint256 index, address indexed addr, bool isContract, bool isProxy);

    modifier onlyCreator() {
        require(structureExists[msg.sender], "Structure does not exist");
        require(structures[msg.sender].isEditable, "Structure is not editable");
        _;
    }

    function createStructure() external {
        require(!structureExists[msg.sender], "Structure already exists");
        structures[msg.sender].isEditable = true;
        structureExists[msg.sender] = true;
        emit StructureCreated(msg.sender);
    }

    function addAddress(address addr, bool isContract, bool isProxy) external onlyCreator {
        AddressInfo memory newAddressInfo = AddressInfo({
            addr: addr,
            isContract: isContract,
            isProxy: isProxy
        });
        structures[msg.sender].addresses.push(newAddressInfo);
        emit AddressAdded(msg.sender, addr, isContract, isProxy);
    }

    function updateAddress(uint256 index, address addr, bool isContract, bool isProxy) external onlyCreator {
        require(index < structures[msg.sender].addresses.length, "Invalid index");
        structures[msg.sender].addresses[index] = AddressInfo({
            addr: addr,
            isContract: isContract,
            isProxy: isProxy
        });
        emit AddressUpdated(msg.sender, index, addr, isContract, isProxy);
    }

    function getAddressStructure(address creator) external view returns (AddressInfo[] memory) {
        require(structureExists[creator], "Structure does not exist");
        return structures[creator].addresses;
    }

    function finalizeStructure() external onlyCreator {
        structures[msg.sender].isEditable = false;
    }

    function isEditable(address creator) external view returns (bool) {
        require(structureExists[creator], "Structure does not exist");
        return structures[creator].isEditable;
    }
}
