import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'
import Header from '../components/Header';

test('renders correctly', () => {
  const tree = renderer
    .create(<Header />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('has headings', () => {
  const { getByText } = render(<Header />);
  expect(getByText('Create a new account')).toBeInTheDocument();
  expect(getByText("It's quick and easy.")).toBeInTheDocument();
});

