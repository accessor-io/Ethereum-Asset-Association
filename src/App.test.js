import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';
import { ethers } from 'ethers';

// Mock ethers
jest.mock('ethers', () => {
  const originalEthers = jest.requireActual('ethers');
  return {
    ...originalEthers,
    ethers: {
      ...originalEthers.ethers,
      BrowserProvider: jest.fn().mockImplementation(() => ({
        send: jest.fn(),
        getSigner: jest.fn().mockReturnValue({
          getAddress: jest.fn().mockReturnValue('0x123'),
        }),
      })),
      Contract: jest.fn().mockImplementation(() => ({
        getResolver: jest.fn().mockReturnValue('0x456'),
        addAddress: jest.fn().mockReturnValue({
          wait: jest.fn().mockResolvedValue({}),
        }),
      })),
    },
  };
});

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/ENS Management and Attestation Group Interface/i);
  expect(headerElement).toBeInTheDocument();
});

test('adds address fields', () => {
  render(<App />);
  const addButton = screen.getByText(/Add Address/i);
  fireEvent.click(addButton);
  const addressInput = screen.getAllByPlaceholderText(/Enter address/i);
  const detailInput = screen.getAllByPlaceholderText(/Enter detail/i);
  expect(addressInput.length).toBe(1);
  expect(detailInput.length).toBe(1);
});

test('generates UID', () => {
  render(<App />);
  const addButton = screen.getByText(/Add Address/i);
  fireEvent.click(addButton);
  const generateButton = screen.getByText(/Generate UID/i);
  fireEvent.click(generateButton);
  const uidElement = screen.getByText(/UID:/i);
  expect(uidElement).toBeInTheDocument();
});

test('fetches resolver', async () => {
  render(<App />);
  const hashInput = screen.getByPlaceholderText(/Enter hash/i);
  fireEvent.change(hashInput, { target: { value: '0xabc' } });
  const fetchButton = screen.getByText(/Fetch Resolver/i);
  fireEvent.click(fetchButton);
  const resolverElement = await screen.findByText(/Resolver Address:/i);
  expect(resolverElement).toBeInTheDocument();
});

test('adds address to resolver', async () => {
  render(<App />);
  const addButton = screen.getByText(/Add Address/i);
  fireEvent.click(addButton);
  const addressInput = screen.getByPlaceholderText(/Enter address/i);
  const detailInput = screen.getByPlaceholderText(/Enter detail/i);
  fireEvent.change(addressInput, { target: { value: '0x123' } });
  fireEvent.change(detailInput, { target: { value: 'Detail for addr1' } });
  const addAddressButton = screen.getByText(/Add Address/i);
  fireEvent.click(addAddressButton);
  const successMessage = await screen.findByText(/Addresses added successfully/i);
  expect(successMessage).toBeInTheDocument();
});
