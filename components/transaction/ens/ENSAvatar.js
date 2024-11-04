import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './common.css'; // Importing common CSS for uniformity

export const ENSAvatar = ({ ensName }) => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        console.log('Infura Project ID:', process.env.REACT_APP_INFURA_PROJECT_ID);
        const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`);
        const avatarUrl = await provider.getAvatar(ensName);
        setAvatarUrl(avatarUrl);
      } catch (error) {
        console.error('Error fetching ENS avatar:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (ensName) {
      fetchAvatar();
    }
  }, [ensName]);

  if (isLoading) {
    return <div className="component-container">Loading avatar...</div>;
  }

  if (isError) {
    return <div className="component-container">Error loading avatar</div>;
  }

  return (
    <div className="component-container">
      {avatarUrl ? (
        <img src={avatarUrl} alt={`Avatar for ${ensName}`} className="ens-avatar" />
      ) : (
        <div className="ens-avatar-placeholder">No avatar found</div>
      )}
    </div>
  );
};
