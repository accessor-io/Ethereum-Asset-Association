import React from 'react';
import AddAttestationComponent from './AddAttestation';
import RemoveAttestationComponent from './RemoveAttestation';
import VerifyAttestationComponent from './VerifyAttestation';
import NameLookupComponent from './NameLookup';
import BatchSigningComponent from './BatchSigning';
import CrossChainCommunicationComponent from './CrossChainCommunication';
import AdminPanelComponent from './AdminPanel';
import styles from '../../styles/ENS.module.css';

function ENSManagementComponent() {
  return (
    <div className={styles.container}>
      <h1>ENS Management</h1>
      <NameLookupComponent />
      <VerifyAttestationComponent />
      <AdminPanelComponent />
    </div>
  );
}

export default ENSManagementComponent;