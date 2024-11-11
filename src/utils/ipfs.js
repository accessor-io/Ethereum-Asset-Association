import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

export const uploadToIPFS = async (data) => {
  try {
    const added = await client.add(JSON.stringify(data));
    return `https://ipfs.infura.io/ipfs/${added.path}`;
  } catch (error) {
    console.error("IPFS upload error:", error);
    return null;
  }
};