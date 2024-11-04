
import React from 'react';
import { render } from '@testing-library/react';
import { EASVerification } from './EASVerification';

test('renders EASVerification component', () => {
  const { getByText } = render(<EASVerification />);
  const linkElement = getByText(/EASVerification Component/i);
  expect(linkElement).toBeInTheDocument();
});
