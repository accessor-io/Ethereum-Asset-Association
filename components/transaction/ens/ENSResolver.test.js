
import React from 'react';
import { render } from '@testing-library/react';
import { ENSResolver } from './ENSResolver';

test('renders ENSResolver component', () => {
  const { getByText } = render(<ENSResolver />);
  const linkElement = getByText(/ENSResolver Component/i);
  expect(linkElement).toBeInTheDocument();
});
