
import React from 'react';
import { render } from '@testing-library/react';
import { ReverseRecordSetter } from './ReverseRecordSetter';

test('renders ReverseRecordSetter component', () => {
  const { getByText } = render(<ReverseRecordSetter />);
  const linkElement = getByText(/ReverseRecordSetter Component/i);
  expect(linkElement).toBeInTheDocument();
});
