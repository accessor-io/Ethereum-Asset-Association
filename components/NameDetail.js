import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEnsName, useEnsResolver } from '@wagmi/core';
import { getEnsText, getEnsAddress } from '@wagmi/core';
import { ENSAvatar } from './ENSAvatar';
import { RecordEditor } from './RecordEditor';
import { AttestationList } from './AttestationList';
import { useEAS } from '../hooks/useEAS';

const NameDetail = ({ resolver, eas, chainId }) => {
  const { name } = useParams();
  const normalizedName = normalize(name);
  const [activeTab, setActiveTab] = useState('records');
  
  const { data: resolverData } = useEnsResolver({ name: normalizedName });
  const { data: textRecords } = getEnsText({ 
    name: normalizedName,
    key: ['avatar', 'description', 'url', 'com.twitter', 'com.github']
  });
  const { data: addressRecord } = getEnsAddress({ name: normalizedName });
  
  const { getAttestationsForAddress, attestationsForName } = useEAS();

  useEffect(() => {
    if (addressRecord) {
      getAttestationsForAddress(addressRecord);
    }
  }, [addressRecord, getAttestationsForAddress]);

  const tabs = [
    { id: 'records', label: 'Records' },
    { id: 'attestations', label: 'Attestations' },
    { id: 'subdomains', label: 'Subdomains' },
    { id: 'history', label: 'History' }
  ];

  return (
    <div className="name-detail">
      <header className="name-header">
        <ENSAvatar 
          name={normalizedName}
          size={64}
          address={addressRecord}
        />
        <h1>{normalizedName}</h1>
        <div className="name-meta">
          {addressRecord && (
            <span className="address">{addressRecord}</span>
          )}
        </div>
      </header>

      <TabBar 
        tabs={tabs}
        selectedTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="name-content">
        {activeTab === 'records' && (
          <RecordEditor
            name={normalizedName}
            resolver={resolverData}
            textRecords={textRecords}
            addressRecord={addressRecord}
            chainId={chainId}
          />
        )}

        {activeTab === 'attestations' && (
          <AttestationList
            attestations={attestationsForName}
            eas={eas}
            address={addressRecord}
          />
        )}

        {/* Add other tab content components */}
      </div>
    </div>
  );
};

export { NameDetail };