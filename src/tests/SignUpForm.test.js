import React from 'react';
import { render } from '@testing-library/react';
import SignUpForm from '../components/SignUpForm';

test('renders learn react link', () => {
  const { getByText } = render(<SignUpForm />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
