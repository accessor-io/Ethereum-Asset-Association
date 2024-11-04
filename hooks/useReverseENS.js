import { useEffect, useState } from "react";
import Web3 from "web3";

const useReverseENS = (address) => {
  const [ensName, setEnsName] = useState("");

  useEffect(() => {
    const reverseENS = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider);
        const name = await web3.eth.ens.getName(address);
        setEnsName(name.name);
      } catch (error) {
        console.error("Reverse ENS resolution error:", error);
      }
    };

    if (address) {
      reverseENS();
    }
  }, [address]);

  return ensName;
};

export default useReverseENS;