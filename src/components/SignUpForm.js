import React, { useState } from 'react';
import Header from './Header';
import Form from './Form';

const SignUpForm = () => {
  const [submittedState, setSubmittedState] = useState(false);
  
  const handleFormSubmit = () => {
    setSubmittedState(true);
    setTimeout(() => setSubmittedState(false), 3000);
  }

  return (
    <div className = "SignUpForm">
      <Header />
      <Form 
        onSubmit={handleFormSubmit} 
      />
      {submittedState && <div>Form Submitted!</div>}
    </div>
  );
}

export default SignUpForm;
