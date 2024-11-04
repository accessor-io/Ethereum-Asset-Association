
import React from 'react';
import { render } from '@testing-library/react';
import { NetworkChecker } from './NetworkChecker';

test('renders NetworkChecker component', () => {
  const { getByText } = render(<NetworkChecker />);
  const linkElement = getByText(/NetworkChecker Component/i);
  expect(linkElement).toBeInTheDocument();
});
