
import React from 'react';
import { render } from '@testing-library/react';
import { AdminControls } from './AdminControls';

test('renders AdminControls component', () => {
  const { getByText } = render(<AdminControls />);
  const linkElement = getByText(/AdminControls Component/i);
  expect(linkElement).toBeInTheDocument();
});
