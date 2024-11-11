
import React from 'react';
import { render } from '@testing-library/react';
import { Profile } from './Profile';

test('renders Profile component', () => {
  const { getByText } = render(<Profile />);
  const linkElement = getByText(/Profile Component/i);
  expect(linkElement).toBeInTheDocument();
});
