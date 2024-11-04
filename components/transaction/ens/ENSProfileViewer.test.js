
import React from 'react';
import { render } from '@testing-library/react';
import { ENSProfileViewer } from './ENSProfileViewer';

test('renders ENSProfileViewer component', () => {
  const { getByText } = render(<ENSProfileViewer />);
  const linkElement = getByText(/ENSProfileViewer Component/i);
  expect(linkElement).toBeInTheDocument();
});
