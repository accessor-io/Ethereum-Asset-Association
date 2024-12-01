import React from 'react';
import { useParams } from 'react-router-dom';

const DomainDetailPage = () => {
  const { domainName } = useParams();
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold">Domain: {domainName}</h1>
    </div>
  );
};

export default DomainDetailPage; 