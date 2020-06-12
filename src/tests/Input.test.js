import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'
import Input from '../components/Input';

test('renders correctly', () => {
  const tree = renderer
    .create(<Input
      type={'text'}
      register={jest.fn()}
      name={'test'} />)
    .toJSON()
  expect(tree).toMatchSnapshot();
});

test('renders input with attributes', () => {
  const { getByPlaceholderText } = render(<Input 
    type={'text'} 
    register={jest.fn()} 
    name={'test'}
    placeholder={'test placeholder'} />);
  const input = getByPlaceholderText('test placeholder');
  expect(input).toHaveAttribute('name', 'test');
  expect(input).toHaveAttribute('type', 'text');
})
