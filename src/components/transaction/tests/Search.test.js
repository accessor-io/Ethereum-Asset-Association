
import React from 'react';
import { render } from '@testing-library/react';
import { Search } from './Search';

test('renders Search component', () => {
  const { getByText } = render(<Search />);
  const linkElement = getByText(/Search Component/i);
  expect(linkElement).toBeInTheDocument();
});
