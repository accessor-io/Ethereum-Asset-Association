import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddAttestationComponent from '../AddAttestation';
import { useContract } from '../../../hooks/useContract';

jest.mock('../../../hooks/useContract');

describe('AddAttestationComponent', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddAttestationComponent />);
    
    expect(getByPlaceholderText('Owner address')).toBeInTheDocument();
    expect(getByPlaceholderText('ENS Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Entity Data')).toBeInTheDocument();
    expect(getByText('Add Attestation')).toBeInTheDocument();
  });

  it('calls addAttestation when form is submitted', async () => {
    const mockAddAttestation = jest.fn().mockResolvedValue({ wait: jest.fn() });
    (useContract as jest.Mock).mockReturnValue({ addAttestation: mockAddAttestation });

    const { getByPlaceholderText, getByText } = render(<AddAttestationComponent />);
    
    fireEvent.change(getByPlaceholderText('Owner address'), { target: { value: '0x123' } });
    fireEvent.change(getByPlaceholderText('ENS Name'), { target: { value: 'test.eth' } });
    fireEvent.change(getByPlaceholderText('Entity Data'), { target: { value: 'Test Data' } });
    
    fireEvent.click(getByText('Add Attestation'));

    await waitFor(() => {
      expect(mockAddAttestation).toHaveBeenCalledWith('0x123', 'test.eth', expect.any(Uint8Array));
    });
  });
});