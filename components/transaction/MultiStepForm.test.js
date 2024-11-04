
import React from 'react';
import { render } from '@testing-library/react';
import { MultiStepForm } from './MultiStepForm';

test('renders MultiStepForm component', () => {
  const { getByText } = render(<MultiStepForm />);
  const linkElement = getByText(/MultiStepForm Component/i);
  expect(linkElement).toBeInTheDocument();
});
