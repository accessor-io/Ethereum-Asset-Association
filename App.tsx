import { Header, Footer } from './components/layout';
import { ENSResolver, AttestationManager } from './components/ens';
import { WalletConnector } from './components/auth';
import { Web3Provider } from './contexts/Web3Context';
import { useContract } from './hooks/useContract';
import { NETWORK_CONFIG } from './config/networkConfig'; 