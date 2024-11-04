import { useEnsAvatar } from '@wagmi/core';

export const ENSAvatar = ({ address }) => {
  const { data: avatarUrl } = useEnsAvatar({ address });

  if (!avatarUrl) return null;

  return <img src={avatarUrl} alt="ENS Avatar" className="ens-avatar" />;
}; 