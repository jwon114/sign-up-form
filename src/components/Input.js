import React from 'react';

const Input = ({ register, name, ...rest }) => (
  <input name={name} ref={register} {...rest} />
);

export default Input;
