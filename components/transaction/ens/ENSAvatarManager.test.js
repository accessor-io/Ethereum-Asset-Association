
import React from 'react';
import { render } from '@testing-library/react';
import { ENSAvatarManager } from './ENSAvatarManager';

test('renders ENSAvatarManager component', () => {
  const { getByText } = render(<ENSAvatarManager />);
  const linkElement = getByText(/ENSAvatarManager Component/i);
  expect(linkElement).toBeInTheDocument();
});
