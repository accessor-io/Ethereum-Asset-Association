
import React from 'react';
import { render } from '@testing-library/react';
import { TransactionLink } from './TransactionLink';

test('renders TransactionLink component', () => {
  const { getByText } = render(<TransactionLink />);
  const linkElement = getByText(/TransactionLink Component/i);
  expect(linkElement).toBeInTheDocument();
});
