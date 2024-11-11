import React from 'react';
import { styled } from '../../styled-components';
import { Typography, Avatar, Switch } from '@mui/material';
import { ConnectButton } from './ConnectButton';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Logo = styled(Typography)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PriceDisplay = styled(Typography)`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Placeholder for ThemeToggle
const ThemeToggle = () => {
  return <Switch color="primary" />;
};

export const Header = () => {
  return (
    <HeaderWrapper>
      <Logo variant="h2" component="h1">
        Ethereum Cross Link Asset Management
      </Logo>
      <RightSection>
        <PriceDisplay variant="body1">$--</PriceDisplay>
        <Avatar alt="User" src="/default-avatar.png" />
        <ConnectButton />
        <ThemeToggle />
      </RightSection>
    </HeaderWrapper>
  );
};
