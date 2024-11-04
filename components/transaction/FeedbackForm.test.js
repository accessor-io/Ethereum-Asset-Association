
import React from 'react';
import { render } from '@testing-library/react';
import { FeedbackForm } from './FeedbackForm';

test('renders FeedbackForm component', () => {
  const { getByText } = render(<FeedbackForm />);
  const linkElement = getByText(/FeedbackForm Component/i);
  expect(linkElement).toBeInTheDocument();
});
