
import React from 'react';
import { render } from '@testing-library/react';
import { NetworkSwitcher } from './NetworkSwitcher';

test('renders NetworkSwitcher component', () => {
  const { getByText } = render(<NetworkSwitcher />);
  const linkElement = getByText(/NetworkSwitcher Component/i);
  expect(linkElement).toBeInTheDocument();
});
