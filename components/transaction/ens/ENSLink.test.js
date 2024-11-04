
import React from 'react';
import { render } from '@testing-library/react';
import { ENSLink } from './ENSLink';

test('renders ENSLink component', () => {
  const { getByText } = render(<ENSLink />);
  const linkElement = getByText(/ENSLink Component/i);
  expect(linkElement).toBeInTheDocument();
});
