
import React from 'react';
import { render } from '@testing-library/react';
import { ENSList } from './ENSList';

test('renders ENSList component', () => {
  const { getByText } = render(<ENSList />);
  const linkElement = getByText(/ENSList Component/i);
  expect(linkElement).toBeInTheDocument();
});
