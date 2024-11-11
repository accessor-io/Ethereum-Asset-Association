import React, { 
    useCallback, 
    useEffect, 
    useMemo, 
    useState 
} from 'react';
import PropTypes from 'prop-types';
import './common.css'; // Importing common CSS for uniformity
import { useENS } from '@/hooks';
import { ensService } from '@/services';
import { ensConstants } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useIPFS } from '../../hooks/useIPFS';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { 
    validateENSName, 
    normalizeENSName 
} from '../../utils/ens';
import { 
    IPFS_GATEWAY, 
    ENS_CACHE_TIME 
} from '../../utils/constants';

export const ENSAvatarManager = ({ 
    address,
    onUpdate,
    cacheTime = ENS_CACHE_TIME,
    ...props 
}) => {
    const { avatar, loading, error } = useENS(address);
    const { account } = useWeb3React();
    const { uploadToIPFS } = useIPFS();

    const [localError, setLocalError] = useState(null);

    const handleAvatarUpdate = useCallback(async (file) => {
        try {
            const ipfsHash = await uploadToIPFS(file);
            await onUpdate?.(ipfsHash);
        } catch (err) {
            setLocalError(err.message);
        }
    }, [uploadToIPFS, onUpdate]);

    ENSAvatarManager.propTypes = {
        address: PropTypes.string.isRequired,
        onUpdate: PropTypes.func,
        cacheTime: PropTypes.number
    };

    return (
        <div className="ens-avatar-manager">
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {localError && <ErrorMessage message={localError} />}
            {avatar && !loading && (
                <div className="avatar-container">
                    <img 
                        src={avatar} 
                        alt="ENS Avatar" 
                        className="ens-avatar"
                    />
                    {account === address && (
                        <input 
                            type="file"
                            onChange={(e) => handleAvatarUpdate(e.target.files[0])}
                            accept="image/*"
                        />
                    )}
                </div>
            )}
        </div>
    );
};
