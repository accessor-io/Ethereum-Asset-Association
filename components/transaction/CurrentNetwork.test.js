
import React from 'react';
import { render } from '@testing-library/react';
import { CurrentNetwork } from './CurrentNetwork';

test('renders CurrentNetwork component', () => {
  const { getByText } = render(<CurrentNetwork />);
  const linkElement = getByText(/CurrentNetwork Component/i);
  expect(linkElement).toBeInTheDocument();
});
