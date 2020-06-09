import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../components/Form';

it('renders correctly', () => {
  const tree = renderer
    .create(<Form 
      onSubmit={jest.fn()} />)
    .toJSON()
  expect(tree).toMatchSnapshot();
});
