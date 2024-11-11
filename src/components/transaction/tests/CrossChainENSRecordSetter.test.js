
import React from 'react';
import { render } from '@testing-library/react';
import { CrossChainENSRecordSetter } from './CrossChainENSRecordSetter';

test('renders CrossChainENSRecordSetter component', () => {
  const { getByText } = render(<CrossChainENSRecordSetter />);
  const linkElement = getByText(/CrossChainENSRecordSetter Component/i);
  expect(linkElement).toBeInTheDocument();
});
