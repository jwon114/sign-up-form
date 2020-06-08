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
      {submittedState && <h2>Form Submitted!</h2>}
    </div>
  );
}

export default SignUpForm;
