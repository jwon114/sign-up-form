import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Form = (props) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [showCustomGender, setShowCustomGender] = useState(false); 
  
  const onSubmit = data => {
    reset();
    props.onSubmit();
    console.log(data)
    console.log(errors)
  }

  const handleGenderChange = event => setShowCustomGender(event.target.value === 'custom');

  const days = () => {
    const allDays = [];
    for (var i = 1; i <= 31; i++) {
      allDays.push(<option key={i} value={i}>{i}</option>);
    }
    return allDays;
  }
  
  const months = () => {
    const allMonths = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i = 1; i <= 12; i++) {
      allMonths.push(<option key={i} value={i}>{monthNames[i - 1]}</option>);
    }
    return allMonths;
  }
  
  const years = () => {
    const allYears = [];
    const thisYear = new Date().getFullYear();
    for (var i = thisYear; i >= thisYear - 115; i--) {
      allYears.push(<option key={i} value={i}>{i}</option>);
    }
    return allYears;
  }

  const isPositive = value => parseInt(value, 10) > 0;

  return (
    <form className="Form" onSubmit={handleSubmit(onSubmit)}>
      <div className="Form__container">
        <div className="Form__name mb-m d-flex space-between">
          <div className="Form__name-container mr-s">
            <input type="text" className="input-text" name="firstName" ref={register({ required: 'First name is required' })} placeholder="First name" />
            {errors.firstName && <i className="Form__error-message">{errors.firstName.message}</i>}
          </div>
          <div className="Form__name-container">
            <input type="text" className="input-text" name="surname" ref={register({ required: 'Surname is required' })} placeholder="Surname" />
            {errors.surname && <i className="Form__error-message">{errors.surname.message}</i>}
          </div>
        </div>
        <div className="Form__contact mb-m">
          <input type="text" className="input-text" name="contact" ref={register({ required: 'Contact details is required' })} placeholder="Mobile number or email address" />
          {errors.contact && <i className="Form__error-message">{errors.contact.message}</i>}
        </div>
        <div className="Form__password mb-m">
          <input type="text" className="input-text" name="password" ref={register({ required: 'Password is required' })} placeholder="New password" />
          {errors.password && <i className="Form__error-message">{errors.password.message}</i>}
        </div>
        <div className="Form__birthday">
          <div className="sub-heading mt-m mb-s">
            <label htmlFor="birthday">Birthday</label>
          </div>
          <select className="drop-down" name="birthday.day" ref={register({ validate: { positive: value => isPositive(value) }})} id="">
            <option value="0">Day</option>
            {days()}
          </select>
          <select className="drop-down" name="birthday.month" ref={register({ validate: { positive: value => isPositive(value) }})} id="">
            <option value="0">Month</option>
            {months()}
          </select>
          <select className="drop-down" name="birthday.year" ref={register({ validate: { positive: value => isPositive(value) }})} id="">
            <option value="0">Year</option>
            {years()}
          </select>
          {(errors.birthday?.day || errors.birthday?.month || errors.birthday?.year) && 
            <div><i className="Form__error-message">Birthday is required.</i></div>}
        </div>
        <div className="Form__gender">
          <div className="sub-heading mt-m mb-s">
            <label htmlFor="gender">Gender</label>
          </div>
          <span className="Form__gender-container">
            <input type="radio" name="gender" value="female" ref={register({ required: true })} onChange={event => handleGenderChange(event)} />
            <label htmlFor="female">Female</label>
          </span>
          <span className="Form__gender-container">
            <input type="radio" name="gender" value="male" ref={register({ required: true })} onChange={event => handleGenderChange(event)} />
            <label htmlFor="male">Male</label>
          </span>
          <span className="Form__gender-container">
            <input type="radio" name="gender" value="custom" ref={register({ required: true })} onChange={event => handleGenderChange(event)} />
            <label htmlFor="custom">Custom</label>
          </span>
          {errors.gender && <div><i className="Form__error-message">Gender is required.</i></div>}
          {showCustomGender && <div className="Form__gender-custom mt-m">
            <select className="drop-down" name="preferred_pronoun" ref={register({ validate: { positive: value => isPositive(value) }})} id="" defaultValue="0">
              <option value="0" disabled>Select your pronoun</option>
              <option value="She">She: "Wish her a happy birthday!"</option>
              <option value="He">He: "Wish him a happy birthday!"</option>
              <option value="They">They: "Wish them a happy birthday!"</option>
            </select>
            {errors.preferred_pronoun && <div><i className="Form__error-message">Preferred pronoun is required.</i></div>}
            <div className="sub-text">Your pronoun is visible to everyone.</div>
            <div className="my-s">
              <input type="text" className="input-text" name="custom_gender" ref={register} placeholder="Gender (optional)" />
            </div>
          </div>}
        </div>
      </div>
      <div className="Form__termsAndConditions">
        <p className="Form__termsAndConditions-text">
          By clicking Sign Up, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy and how we use cookies and similar technology in our Cookie Policy. You may receive SMS notifications from us and can opt out at any time.
        </p>
      </div>
      <div className="Form__submit-button-container">
        <button type="submit" className="button button-green">Sign Up</button>
      </div>
    </form>
  );
}

export default Form;