import { useEffect, useState } from "react";
import Web3 from "web3";
import { getMyENSContract } from "../contracts";

const useContract = (currentNetwork) => {
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum && currentNetwork) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const myENS = getMyENSContract(currentNetwork.name.toLowerCase().replace(" ", "_"), web3Instance);
      setContract(myENS);
    }
  }, [currentNetwork]);

  return { web3, contract };
};

export default useContract;