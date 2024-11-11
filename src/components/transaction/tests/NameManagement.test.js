
import React from 'react';
import { render } from '@testing-library/react';
import { NameManagement } from './NameManagement';

test('renders NameManagement component', () => {
  const { getByText } = render(<NameManagement />);
  const linkElement = getByText(/NameManagement Component/i);
  expect(linkElement).toBeInTheDocument();
});
