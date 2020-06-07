import React from 'react';

const Input = ({ register, name, errors, ...rest }) => (
  <input name={name} ref={register} {...rest} />
);

export default Input;
