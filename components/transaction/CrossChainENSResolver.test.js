
import React from 'react';
import { render } from '@testing-library/react';
import { CrossChainENSResolver } from './CrossChainENSResolver';

test('renders CrossChainENSResolver component', () => {
  const { getByText } = render(<CrossChainENSResolver />);
  const linkElement = getByText(/CrossChainENSResolver Component/i);
  expect(linkElement).toBeInTheDocument();
});
