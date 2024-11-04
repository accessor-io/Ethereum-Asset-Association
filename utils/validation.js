export const isValidENSName = (name) => {
  const ensRegex = /^[a-z0-9-]+\.eth$/;
  return ensRegex.test(name);
};

export const isValidEthereumAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};