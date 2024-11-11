
import React from 'react';
import { render } from '@testing-library/react';
import { ENSReverseResolution } from './ENSReverseResolution';

test('renders ENSReverseResolution component', () => {
  const { getByText } = render(<ENSReverseResolution />);
  const linkElement = getByText(/ENSReverseResolution Component/i);
  expect(linkElement).toBeInTheDocument();
});
