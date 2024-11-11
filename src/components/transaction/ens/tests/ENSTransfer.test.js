
import React from 'react';
import { render } from '@testing-library/react';
import { ENSTransfer } from './ENSTransfer';

test('renders ENSTransfer component', () => {
  const { getByText } = render(<ENSTransfer />);
  const linkElement = getByText(/ENSTransfer Component/i);
  expect(linkElement).toBeInTheDocument();
});
