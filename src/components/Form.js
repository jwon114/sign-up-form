import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import Input from './Input';
import Select from './Select';

const FormSchema = object().shape({
  firstName: string().required('First name is required'),
  surname: string().required('Surname is required'),
  contact: string().required('Contact number or email is required'),
  password: string().required('Password is required'),
  birthday: object({
    day: string().required(),
    month: string().required(),
    year: string().required()
  }),
  gender: string().required('Gender is required'),
  preferred_pronoun: string()
    .when('gender', {
      is: 'custom',
      then: string().required('Preferred pronoun is required')
    }),
  custom_gender: string()
});

const days = () => {
  const allDays = [];
  for (var i = 1; i <= 31; i++) {
    allDays.push(<option key={i} value={i}>{i}</option>);
  }
  return allDays;
}

const months = () => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames.map((month, i) => <option key={i + 1} value={i + 1}>{month}</option>)
}

const years = () => {
  const allYears = [];
  const thisYear = new Date().getFullYear();
  for (var i = thisYear; i >= thisYear - 115; i--) {
    allYears.push(<option key={i} value={i}>{i}</option>);
  }
  return allYears;
}

const pronouns = () => {
  const pronounList = ['She: "Wish her a happy birthday!', 'He: "Wish him a happy birthday!"', 'They: "Wish them a happy birthday!"'];
  return pronounList.map((pronoun, i) => <option key={i + 1} value={i + 1}>{pronoun}</option>);
}

const Form = (props) => {
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: FormSchema
  });
  const [showCustomGender, setShowCustomGender] = useState(false); 
  
  const onSubmit = data => {
    console.log(data);
    reset();
    props.onSubmit();
  }

  const handleGenderChange = event => setShowCustomGender(event.target.value === 'custom');

  return (
    <form className="Form" onSubmit={handleSubmit(onSubmit)}>
      <div className="Form__container">
        <div className="Form__name mb-m d-flex space-between">
          <div className="Form__name-container mr-s">
            <Input type="text" name="firstName" register={register} placeholder="First name" />
            {errors.firstName && <i className="Form__error-message">{errors.firstName.message}</i>}
          </div>
          <div className="Form__name-container">
            <Input type="text" name="surname" register={register} placeholder="Surname" />
            {errors.surname && <i className="Form__error-message">{errors.surname.message}</i>}
          </div>
        </div>
        <div className="Form__contact mb-m">
          <Input type="text" name="contact" register={register} placeholder="Mobile number or email address" />
          {errors.contact && <i className="Form__error-message">{errors.contact.message}</i>}
        </div>
        <div className="Form__password mb-m">
          <Input type="text" name="password" register={register} placeholder="New password" />
          {errors.password && <i className="Form__error-message">{errors.password.message}</i>}
        </div>
        <div className="Form__birthday">
          <div className="sub-heading mt-m mb-s">
            <label htmlFor="birthday">Birthday</label>
          </div>
          <Select name="birthday.day" register={register} options={days()} noValue={"Day"} />
          <Select name="birthday.month" register={register} options={months()} noValue={"Month"} />
          <Select name="birthday.year" register={register} options={years()} noValue={"Year"} />
          {(errors.birthday?.day || errors.birthday?.month || errors.birthday?.year) &&
            <div><i className="Form__error-message">Birthday is required.</i></div>}
        </div>
        <div className="Form__gender">
          <div className="sub-heading mt-m mb-s">
            <label htmlFor="gender">Gender</label>
          </div>
          <span className="Form__gender-container">
            <Input type="radio" name="gender" value="female" register={register} onChange={event => handleGenderChange(event)} />
            <label htmlFor="female">Female</label>
          </span>
          <span className="Form__gender-container">
            <Input type="radio" name="gender" value="male" register={register} onChange={event => handleGenderChange(event)}  />
            <label htmlFor="male">Male</label>
          </span>
          <span className="Form__gender-container">
            <Input type="radio" name="gender" value="custom" register={register} onChange={event => handleGenderChange(event)}  />
            <label htmlFor="custom">Custom</label>
          </span>
          {errors.gender && <div><i className="Form__error-message">Gender is required.</i></div>}
          {showCustomGender && <div className="Form__gender-custom mt-m">
            <Select name="preferred_pronoun" register={register} id="" options={pronouns()} noValue={"Select your pronoun"} />
            {errors.preferred_pronoun && <div><i className="Form__error-message">Preferred pronoun is required.</i></div>}
            <div className="sub-text">Your pronoun is visible to everyone.</div>
            <div className="my-s">
              <Input type="text" name="custom_gender" register={register} placeholder="Gender (optional)" />
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
