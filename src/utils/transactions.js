import { getGasPrice, estimateGas } from './ethereum';

export const prepareTransaction = async (transaction, provider, gasPriceMultiplier = 1.1) => {
  const gasPrice = await getGasPrice(provider);
  const estimatedGas = await estimateGas(transaction, provider);

  return {
    ...transaction,
    gasPrice: gasPrice.mul(Math.floor(gasPriceMultiplier * 100)).div(100),
    gasLimit: estimatedGas.mul(120).div(100), // Add 20% buffer
  };
}

export const sendTransaction = async (preparedTransaction, signer) => {
  const tx = await signer.sendTransaction(preparedTransaction);
  return await tx.wait();
}