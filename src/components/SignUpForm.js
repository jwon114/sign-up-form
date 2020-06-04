import React, { useState } from 'react';
import Header from './Header';
import Form from './Form';

const SignUpForm = () => {  
  const handleFormSubmit = (item) => {
    console.log('Form submitted');
  }

  return (
    <div className = "SignUpForm">
      <Header />
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
}

export default SignUpForm;
