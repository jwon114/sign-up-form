import React, { useState } from 'react';
import Header from './Header';
import Form from './Form';

const SignUpForm = () => {
  const [state, setState] = useState({ submitted: false });
  
  const handleFormSubmit = () => {
    setState({
      ...state,
      submitted: true
    });
  }

  return (
    <div className = "SignUpForm">
      <Header />
      <Form 
        onSubmit={handleFormSubmit} 
      />
      {state.submitted && <div>Form Submitted!</div>}
    </div>
  );
}

export default SignUpForm;
