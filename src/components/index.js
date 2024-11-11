// Core components
export { default as Dashboard } from './Dashboard';
export { default as Navigation } from './Navigation';
export { default as Header } from '../src/components/Header';
export { default as Footer } from './Footer';

// ENS components
export { default as ENSProfileViewer } from './ens/ENSProfileViewer';
export { default as ENSResolver } from './ens/ENSResolver';
export { default as ENSSearch } from './ens/ENSSearch';
export { default as ENSTextRecords } from './ens/ENSTextRecords';

// Network components
export { default as NetworkChecker } from './network/NetworkChecker';
export { default as NetworkStatus } from './network/NetworkStatus';
export { default as NetworkSwitcher } from './network/NetworkSwitcher';

// Authentication components
export { default as WalletConnector } from './auth/WalletConnector';
export { default as EthereumLogin } from './auth/EthereumLogin';

// Common components
export { default as ActionButton } from '../src/components/common/ActionButton';
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as ErrorHandler } from './ErrorHandler';
