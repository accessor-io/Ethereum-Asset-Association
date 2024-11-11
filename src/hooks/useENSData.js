import { useQuery } from "react-query";
import { getENSData } from "../api/ens";

const useENSData = (ensName) => {
  return useQuery(["ensData", ensName], () => getENSData(ensName), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useENSData;