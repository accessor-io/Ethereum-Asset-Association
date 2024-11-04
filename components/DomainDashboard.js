import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabBar } from './TabBar';
import { DomainList } from './DomainList';
import { EASOverview } from './EASOverview';
import { useEAS } from '../hooks/useEAS';

const DomainDashboard = ({
  domains,
  wrappedDomains,
  isLoading,
  error,
  onRetry,
  selectedTab,
  onTabChange
}) => {
  const navigate = useNavigate();
  const { attestations, isLoadingAttestations } = useEAS();

  // Organize domains by category
  const organizedDomains = useMemo(() => {
    if (!domains) return {};
    
    return {
      active: domains.filter(d => !isExpired(d.expiryDate)),
      expiring: domains.filter(d => isExpiringSoon(d.expiryDate)),
      wrapped: wrappedDomains || []
    };
  }, [domains, wrappedDomains]);

  const tabs = [
    { id: 'domains', label: 'My Domains', count: domains?.length },
    { id: 'wrapped', label: 'Wrapped Names', count: wrappedDomains?.length },
    { id: 'attestations', label: 'Attestations', count: attestations?.length },
    { id: 'expiring', label: 'Expiring Soon', count: organizedDomains.expiring?.length }
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'domains':
        return (
          <DomainList 
            domains={organizedDomains.active}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
            onDomainClick={(name) => navigate(`/domain/${name}`)}
          />
        );

      case 'wrapped':
        return (
          <DomainList 
            domains={organizedDomains.wrapped}
            isWrapped
            isLoading={isLoading}
            onDomainClick={(name) => navigate(`/domain/${name}`)}
          />
        );

      case 'attestations':
        return (
          <EASOverview 
            attestations={attestations}
            isLoading={isLoadingAttestations}
            onAttestationClick={(uid) => navigate(`/eas/attestation/${uid}`)}
          />
        );

      case 'expiring':
        return (
          <DomainList 
            domains={organizedDomains.expiring}
            isLoading={isLoading}
            showExpiryWarning
            onDomainClick={(name) => navigate(`/domain/${name}`)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="domain-dashboard">
      <TabBar 
        tabs={tabs}
        selectedTab={selectedTab}
        onChange={onTabChange}
      />
      
      {error && !isLoading && (
        <div className="error-message">
          <p>Failed to load domains</p>
          <button onClick={onRetry}>Retry</button>
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default DomainDashboard;