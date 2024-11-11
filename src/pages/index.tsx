import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ENSSearch from '../components/ENSSearch';
import ENSProfile from '../components/ENSProfile';
import ConnectWallet from '../components/ConnectWallet';

export default function Home() {
  const [ensProfile, setEnsProfile] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleProfileFound = (profile) => {
    setEnsProfile(profile);
  };

  const handleWalletConnection = (connected) => {
    setIsWalletConnected(connected);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 ENS Explorer</title>
        <meta name="description" content="Explore Ethereum Name Service with style" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={`${styles.title} neonText`}>Web3 ENS Explorer</h1>
        <ConnectWallet onConnectionChange={handleWalletConnection} />
      </header>

      <main className={`${styles.main} floatingElement`}>
        <ENSSearch onProfileFound={handleProfileFound} />
        
        {ensProfile && (
          <div className={`${styles.profileWrapper} gradientBg`}>
            <ENSProfile profile={ensProfile} />
          </div>
        )}

        {!ensProfile && (
          <div className={`${styles.placeholder} neonText`}>
            Search for an ENS name to see the magic!
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Powered by Web3 Technology</p>
      </footer>
    </div>
  );
}