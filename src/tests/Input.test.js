import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../components/Input';

it('renders correctly', () => {
  const tree = renderer
    .create(<Input 
      register={jest.fn()}
      name={'test'} />)
    .toJSON()
  expect(tree).toMatchSnapshot();
});
