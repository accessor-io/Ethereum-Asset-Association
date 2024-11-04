
import React from 'react';
import { render } from '@testing-library/react';
import { SubdomainManager } from './SubdomainManager';

test('renders SubdomainManager component', () => {
  const { getByText } = render(<SubdomainManager />);
  const linkElement = getByText(/SubdomainManager Component/i);
  expect(linkElement).toBeInTheDocument();
});
