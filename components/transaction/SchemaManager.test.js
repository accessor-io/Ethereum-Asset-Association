
import React from 'react';
import { render } from '@testing-library/react';
import { SchemaManager } from './SchemaManager';

test('renders SchemaManager component', () => {
  const { getByText } = render(<SchemaManager />);
  const linkElement = getByText(/SchemaManager Component/i);
  expect(linkElement).toBeInTheDocument();
});
