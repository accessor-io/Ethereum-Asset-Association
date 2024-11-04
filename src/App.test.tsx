import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // Update this test to match your App component's content
  const linkElement = screen.getByText(/Ethereum Cross Link Asset Management Service/i);
  expect(linkElement).toBeInTheDocument();
});