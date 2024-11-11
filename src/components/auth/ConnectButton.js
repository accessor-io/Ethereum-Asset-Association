import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from '@wagmi/connectors/metaMask';

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button onClick={() => disconnect()}>
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}; 