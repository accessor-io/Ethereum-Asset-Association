
import React from 'react';
import { render } from '@testing-library/react';
import { MultichainResolver } from './MultichainResolver';

test('renders MultichainResolver component', () => {
  const { getByText } = render(<MultichainResolver />);
  const linkElement = getByText(/MultichainResolver Component/i);
  expect(linkElement).toBeInTheDocument();
});
