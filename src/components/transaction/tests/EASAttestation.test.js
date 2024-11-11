
import React from 'react';
import { render } from '@testing-library/react';
import { EASAttestation } from './EASAttestation';

test('renders EASAttestation component', () => {
  const { getByText } = render(<EASAttestation />);
  const linkElement = getByText(/EASAttestation Component/i);
  expect(linkElement).toBeInTheDocument();
});
