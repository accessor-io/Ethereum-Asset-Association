
import React from 'react';
import { render } from '@testing-library/react';
import { ENSTextRecords } from './ENSTextRecords';

test('renders ENSTextRecords component', () => {
  const { getByText } = render(<ENSTextRecords />);
  const linkElement = getByText(/ENSTextRecords Component/i);
  expect(linkElement).toBeInTheDocument();
});
