import React from 'react';
import renderer from 'react-test-renderer';
import Select from '../components/Select';

test('renders correctly', () => {
  const tree = renderer
    .create(<Select 
      register={jest.fn()}
      options={<option key={0} value={1}>test</option>}
      name={'test'}
      noValue={'no value'} />)
    .toJSON()
  expect(tree).toMatchSnapshot();
});
