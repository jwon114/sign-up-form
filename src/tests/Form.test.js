import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react'
import Form from '../components/Form';

test('renders correctly', () => {
  const testRenderer = renderer
    .create(<Form onSubmit={jest.fn()} />)
    .toJSON()
  expect(testRenderer).toMatchSnapshot();
});

describe('elements in form', () => {
  let testRenderer, testInstance;

  beforeEach(() => {
    testRenderer = renderer.create(<Form onSubmit={jest.fn()} />);
    testInstance = testRenderer.root;
  })

  test('has 7 inputs', () => {
    expect(testInstance.findAllByType('input').length).toEqual(7);
  });
  
  test('has 3 selects', () => {
    expect(testInstance.findAllByType('select').length).toEqual(3);
  });
  
  test('has a submit button', () => {
    expect(testInstance.findAllByType('button').length).toEqual(1);
  });
})

describe('testing form inputs', () => {
  test('first name input changes', () => {
    const { getByPlaceholderText } = render(<Form onSubmit={jest.fn()} />);
    const firstName = getByPlaceholderText('First name');
    expect(firstName.value).toEqual('');
    fireEvent.change(firstName, { target: { value: 'Hello' } });
    expect(firstName.value).toEqual('Hello');
  });
  
  test('surname input changes', () => {
    const { getByPlaceholderText } = render(<Form onSubmit={jest.fn()} />);
    const surname = getByPlaceholderText('Surname');
    expect(surname.value).toEqual('');
    fireEvent.change(surname, { target: { value: 'World' } });
    expect(surname.value).toEqual('World');
  });

  test('contact input changes', () => {
    const { getByPlaceholderText } = render(<Form onSubmit={jest.fn()} />);
    const contact = getByPlaceholderText('Mobile number or email address');
    expect(contact.value).toEqual('');
    fireEvent.change(contact, { target: { value: 'hello@world.com' } });
    expect(contact.value).toEqual('hello@world.com');
  })

  test('password input changes', () => {
    const { getByPlaceholderText } = render(<Form onSubmit={jest.fn()} />);
    const password = getByPlaceholderText('New password');
    expect(password.value).toEqual('');
    fireEvent.change(password, { target: { value: 'password123' } });
    expect(password.value).toEqual('password123');
  });

  test('birthday day selection dropdown options', () => {
    const { getByDisplayValue } = render(<Form onSubmit={jest.fn()} />);
    const day = getByDisplayValue('Day');
    expect(day.options.length).toEqual(32);
    expect(day.options[day.selectedIndex].text).toEqual('Day');
    fireEvent.change(day, { target: { value: '1' } });
    expect(day.options[day.selectedIndex].text).toEqual('1');
  });

  test('birthday month selection dropdown options', () => {
    const { getByDisplayValue } = render(<Form onSubmit={jest.fn()} />);
    const month = getByDisplayValue('Month');
    expect(month.options.length).toEqual(13);
    expect(month.options[month.selectedIndex].text).toEqual('Month');
    fireEvent.change(month, { target: { value: '5' } });
    expect(month.options[month.selectedIndex].text).toEqual('May');
  });

  test('birthday year selection dropdown options', () => {
    const { getByDisplayValue } = render(<Form onSubmit={jest.fn()} />);
    const year = getByDisplayValue('Year');
    expect(year.options.length).toEqual(117);
    expect(year.options[year.selectedIndex].text).toEqual('Year');
    fireEvent.change(year, { target: { value: '1995' } });
    expect(year.options[year.selectedIndex].text).toEqual('1995');
  });

  test('gender selection radio input', () => {
    const { getByLabelText } = render(<Form onSubmit={jest.fn()} />);
    const male = getByLabelText('Male');
    const female = getByLabelText('Female');
    const custom = getByLabelText('Custom');
    expect(male).not.toBeChecked();
    expect(female).not.toBeChecked();
    expect(custom).not.toBeChecked();
    fireEvent.click(female);
    expect(male).not.toBeChecked();
    expect(female).toBeChecked();
    expect(custom).not.toBeChecked();
    fireEvent.click(male);
    expect(male).toBeChecked();
    expect(female).not.toBeChecked();
    expect(custom).not.toBeChecked();
    fireEvent.click(custom);
    expect(male).not.toBeChecked();
    expect(female).not.toBeChecked();
    expect(custom).toBeChecked();
  });

  test('custom gender selected dropdown options', () => {
    const { getByDisplayValue, getByLabelText, getByText } = render(<Form onSubmit={jest.fn()} />);
    const custom = getByLabelText('Custom');
    fireEvent.click(custom);
    expect(getByText('Your pronoun is visible to everyone.')).toBeInTheDocument();
    const pronoun = getByDisplayValue('Select your pronoun');
    expect(pronoun.options.length).toEqual(4);
    expect(pronoun.options[pronoun.selectedIndex].text).toEqual('Select your pronoun');
    fireEvent.change(pronoun, { target: { value: '1' } });
    expect(pronoun.options[pronoun.selectedIndex].text).toEqual('She: \"Wish her a happy birthday!\"');
    fireEvent.change(pronoun, { target: { value: '2' } });
    expect(pronoun.options[pronoun.selectedIndex].text).toEqual('He: \"Wish him a happy birthday!\"');
    fireEvent.change(pronoun, { target: { value: '3' } });
    expect(pronoun.options[pronoun.selectedIndex].text).toEqual('They: \"Wish them a happy birthday!\"');
  });
  
  test('custom gender input', () => {
    const { getByLabelText, getByPlaceholderText } = render(<Form onSubmit={jest.fn()} />);
    const custom = getByLabelText('Custom');
    fireEvent.click(custom);
    const customInput = getByPlaceholderText('Gender (optional)');
    expect(customInput.value).toEqual('');
    fireEvent.change(customInput, { target: { value: 'My custom' } });
    expect(customInput.value).toEqual('My custom');
  });
  
});
