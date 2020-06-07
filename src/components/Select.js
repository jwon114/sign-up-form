import React from 'react';

const Select = ({ register, options, name, noValue, ...rest }) => (
  <select name={name} ref={register} {...rest}>
    <option value="">{noValue}</option>
    {options}
  </select>
);

export default Select;
