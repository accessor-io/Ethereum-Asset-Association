
import React from 'react';
import { render } from '@testing-library/react';
import { WalletConnector } from './WalletConnector';

test('renders WalletConnector component', () => {
  const { getByText } = render(<WalletConnector />);
  const linkElement = getByText(/WalletConnector Component/i);
  expect(linkElement).toBeInTheDocument();
});
