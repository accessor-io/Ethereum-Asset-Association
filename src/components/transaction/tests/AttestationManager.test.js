
import React from 'react';
import { render } from '@testing-library/react';
import { AttestationManager } from './AttestationManager';

test('renders AttestationManager component', () => {
  const { getByText } = render(<AttestationManager />);
  const linkElement = getByText(/AttestationManager Component/i);
  expect(linkElement).toBeInTheDocument();
});
