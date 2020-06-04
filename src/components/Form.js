import React, { useState } from 'react';

const Form = (props) => {
  const [state, setState] = useState({
    firstName: '',
    surname: '',
    contact: '',
    password: '',
    birthday_day: '',
    birthday_month: '',
    birthday_year: '',
    preferred_pronoun: '',
    gender: ''
  });

  const [showCustomGender, setShowCustomGender] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.onSubmit(inputValue);
    setState({
      firstName: '',
      surname: '',
      contact: '',
      password: '',
      birthday_day: '',
      birthday_month: '',
      birthday_year: '',
      preferred_pronoun: '',
      gender: ''
    });
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  const birthdayDays = () => {
    const days = [];
    for(var i = 1; i <= 31; i++) {
      days.push(<option key={i} value={i}>{i}</option>);
    }
    return days;
  }

  const birthdayMonths = () => {
    const months = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for(var i = 1; i <= 12; i++) {
      months.push(<option key={i} value={i}>{monthNames[i - 1]}</option>);
    }
    return months;
  }
  
  const birthdayYears = () => {
    const years = [];
    const thisYear = new Date().getFullYear();
    for(var i = thisYear; i >= thisYear - 115; i--) {
      years.push(<option key={i} value={i}>{i}</option>);
    }
    return years;
  }

  const handleGenderChange = (event) => {
    if (event.target.value === 'custom') {
      setShowCustomGender(true);
      setState({
        ...state,
        preferred_pronoun: '',
        gender: ''
      })
    } else {
      setShowCustomGender(false);
      setState({
        ...state,
        preferred_pronoun: '',
        gender: event.target.value
      });
    }
  }

  const customGender = () => (
    <div className="Form__gender-custom mt-m">
      <select className="drop-down" name="preferred_pronoun" id="" defaultValue="0" onChange={handleChange}>
        <option value="0" disabled>Select your pronoun</option>
        <option value="She">She: "Wish her a happy birthday!"</option>
        <option value="He">He: "Wish him a happy birthday!"</option>
        <option value="They">They: "Wish them a happy birthday!"</option>
      </select>
      <div className="sub-text">Your pronoun is visible to everyone.</div>
      <div className="my-s">
        <input type="text" className="input-text" name="gender" placeholder="Gender (optional)" value={state.gender} onChange={handleChange} />
      </div>
    </div>
  )

  const termsAndConditions = () => (
    <div className="Form__termsAndConditions">
      <p className="Form__termsAndConditions-text">
        By clicking Sign Up, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy and how we use cookies and similar technology in our Cookie Policy. You may receive SMS notifications from us and can opt out at any time.
      </p>
    </div>
  )

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div className="Form__container">
        <div className="Form__name mb-m d-flex space-between">
          <div className="Form__name-container mr-s">
            <input type="text" className="input-text" name="firstName" value={state.firstName} placeholder="First name" onChange={handleChange} />
          </div>
          <div className="Form__name-container">
            <input type="text" className="input-text" name="surname" value={state.surname} placeholder="Surname" onChange={handleChange} />
          </div>
        </div>
        <div className="Form__contact mb-m">
          <input type="text" className="input-text" name="contact" value={state.contact} placeholder="Mobile number or email address" onChange={handleChange} />
        </div>
        <div className="Form__password mb-m">
          <input type="text" className="input-text" name="password" value={state.password} placeholder="New password" onChange={handleChange} />
        </div>
        <div className="Form__birthday">
          <div className="sub-heading mt-m mb-s">
            <label htmlFor="birthday">Birthday</label>
          </div>
          <select className="drop-down" name="birthday_day" id="" onChange={handleChange}>
            <option value="0">Day</option>
            {birthdayDays()}
          </select>
          <select className="drop-down" name="birthday_month" id="" onChange={handleChange}>
            <option value="0">Month</option>
            {birthdayMonths()}
          </select>
          <select className="drop-down" name="birthday_year" id="" onChange={handleChange}>
            <option value="0">Year</option>
            {birthdayYears()}
          </select>
        </div>
        <div className="Form__gender">
          <div className="sub-heading mt-m mb-s">
            <label htmlFor="gender">Gender</label>
          </div>
          <span className="Form__gender-container">
            <input type="radio" name="gender" value="female" onChange={handleGenderChange} />
            <label htmlFor="female">Female</label>
          </span>
          <span className="Form__gender-container">
            <input type="radio" name="gender" value="male" onChange={handleGenderChange} />
            <label htmlFor="male">Male</label>
          </span>
          <span className="Form__gender-container">
            <input type="radio" name="gender" value="custom" onChange={handleGenderChange} />
            <label htmlFor="custom">Custom</label>
          </span>
          {showCustomGender && customGender()}
        </div>
      </div>
      {termsAndConditions()}
      <input type="submit" value="Sign Up"/>
    </form>
  );
}

export default Form;