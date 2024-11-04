
import React from 'react';
import { render } from '@testing-library/react';
import { EASInteraction } from './EASInteraction';

test('renders EASInteraction component', () => {
  const { getByText } = render(<EASInteraction />);
  const linkElement = getByText(/EASInteraction Component/i);
  expect(linkElement).toBeInTheDocument();
});
