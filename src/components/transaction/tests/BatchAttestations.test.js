
import React from 'react';
import { render } from '@testing-library/react';
import { BatchAttestations } from './BatchAttestations';

test('renders BatchAttestations component', () => {
  const { getByText } = render(<BatchAttestations />);
  const linkElement = getByText(/BatchAttestations Component/i);
  expect(linkElement).toBeInTheDocument();
});
