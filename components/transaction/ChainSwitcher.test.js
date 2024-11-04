
import React from 'react';
import { render } from '@testing-library/react';
import { ChainSwitcher } from './ChainSwitcher';

test('renders ChainSwitcher component', () => {
  const { getByText } = render(<ChainSwitcher />);
  const linkElement = getByText(/ChainSwitcher Component/i);
  expect(linkElement).toBeInTheDocument();
});
