import React from 'react';
import renderer from 'react-test-renderer';
import SignUpForm from '../components/SignUpForm';

it('renders correctly', () => {
  const tree = renderer
    .create(<SignUpForm />)
    .toJSON()
  expect(tree).toMatchSnapshot();
});
