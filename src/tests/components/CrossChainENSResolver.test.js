import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CrossChainENSResolver from '../components/CrossChainENSResolver';
import { resolveENS, lookupAddress } from '../utils/ens';
import { switchChain } from '../utils/ethereum';

jest.mock('../utils/ens');
jest.mock('../utils/ethereum');

describe('CrossChainENSResolver', () => {
  it('resolves ENS name correctly', async () => {
    resolveENS.mockResolvedValue('0x1234567890123456789012345678901234567890');
    switchChain.mockResolvedValue();

    const { getByPlaceholderText, getByText } = render(<CrossChainENSResolver setError={() => {}} setLoading={() => {}} />);
    
    fireEvent.change(getByPlaceholderText('ENS name or address'), { target: { value: 'example.eth' } });
    fireEvent.click(getByText('Resolve'));

    await waitFor(() => {
      expect(getByText('Result: 0x1234567890123456789012345678901234567890')).toBeInTheDocument();
    });
  });

  // Add more tests...
});