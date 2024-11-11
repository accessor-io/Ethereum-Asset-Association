
import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from './Footer';

test('renders Footer component', () => {
  const { getByText } = render(<Footer />);
  const linkElement = getByText(/Footer Component/i);
  expect(linkElement).toBeInTheDocument();
});
