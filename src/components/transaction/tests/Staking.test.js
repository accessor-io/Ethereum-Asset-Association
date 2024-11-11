
import React from 'react';
import { render } from '@testing-library/react';
import { Staking } from './Staking';

test('renders Staking component', () => {
  const { getByText } = render(<Staking />);
  const linkElement = getByText(/Staking Component/i);
  expect(linkElement).toBeInTheDocument();
});
