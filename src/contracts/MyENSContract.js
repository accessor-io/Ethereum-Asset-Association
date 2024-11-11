import Web3 from "web3";
import MyENSContractABI from "./abis/MyENSContract.json";
import { NETWORKS } from "../config/networkConfig";
import addresses from "./addresses.json";

let web3;
let contract;
let currentNetwork;

export const initializeContract = async (provider) => {
  web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  currentNetwork = Object.values(NETWORKS).find(
    (network) => network.chainId === networkId
  );

  if (!currentNetwork) {
    throw new Error("Unsupported network");
  }

  const contractAddress = addresses[currentNetwork.name.toLowerCase().replace(" ", "_")].MyENSContract;
  contract = new web3.eth.Contract(MyENSContractABI, contractAddress);
};

export const getContract = () => {
  if (!contract) throw new Error("Contract not initialized");
  return contract;
};