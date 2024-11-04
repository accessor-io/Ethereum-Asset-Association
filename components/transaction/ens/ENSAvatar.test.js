
import React from 'react';
import { render } from '@testing-library/react';
import { ENSAvatar } from './ENSAvatar';

test('renders ENSAvatar component', () => {
  const { getByText } = render(<ENSAvatar />);
  const linkElement = getByText(/ENSAvatar Component/i);
  expect(linkElement).toBeInTheDocument();
});
