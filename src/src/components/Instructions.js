import React from 'react';
import { ethers } from 'ethers';

const Instructions = ({ signer }) => {
  const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
  const contractABI = [ /* YOUR_CONTRACT_ABI */ ]; // Replace with your contract ABI

  const registerGroup = async () => {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.registerGroup({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    alert("Group registered successfully.");
  };

  const addAddress = async () => {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const hash = prompt("Enter the group hash:");
    const address = prompt("Enter the address to add:");
    const detail = prompt("Enter the address detail:");
    const isProxy = confirm("Is this a proxy address?");
    const isContract = confirm("Is this a contract address?");
    const tx = await contract.addAddressToGroup(hash, address, detail, isProxy, isContract, { value: ethers.utils.parseEther("0.002") });
    await tx.wait();
    alert("Address added successfully.");
  };

  return (
    <section id="instructions" className="section">
      <h2>How to Use</h2>
      <ol>
        <li><strong>Register a Group:</strong> To register a new group, you need to pay a registration fee. The group hash is generated deterministically from your address and a nonce.</li>
        <li><strong>Add Addresses:</strong> Once a group is registered, you can add addresses to the group by paying an address fee. Each address can be marked as a proxy or a contract.</li>
        <li><strong>Resolve ENS Names:</strong> Our service supports resolving ENS names to their corresponding addresses, ensuring you always have up-to-date address information.</li>
      </ol>
      <button onClick={registerGroup}>Register Group</button>
      <button onClick={addAddress}>Add Address</button>
    </section>
  );
};

export default Instructions;
