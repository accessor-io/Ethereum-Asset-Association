import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { ethers } from 'ethers';
import { initializeWeb3, fetchResolver, addAddressToResolver } from './services/web3Service';

jest.mock('./services/web3Service');
jest.mock('ethers');

// Mock ethers
jest.mock('ethers', () => {
  const originalEthers = jest.requireActual('ethers');
  return {
    ...originalEthers,
    providers: {
      Web3Provider: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
        getSigner: jest.fn().mockReturnValue({
          getAddress: jest.fn().mockReturnValue('0x123'),
        }),
      })),
    },
    Contract: jest.fn().mockImplementation(() => ({
      getResolver: jest.fn().mockReturnValue('0x456'),
      addAddress: jest.fn().mockReturnValue({
        wait: jest.fn().mockResolvedValue({}),
      }),
    })),
  };
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/ENS Management and Attestation Group Interface/i);
  expect(linkElement).toBeInTheDocument();
});

// Add more tests as needed
