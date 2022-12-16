import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import FormInput from 'components/formInput/formInput.component';

import styles from './loginform.module.scss';

// const handleSubmit = async (event) => {
//   event.preventDefault();

//   try {
//     await signInAuthUserWithEmailAndPassword(email, password);
//     resetFormFields();
//   } catch (error) {
//     console.log('user sign in failed', error);
//   }
// };`

function LoginForm() {
  const defaultFormFields = {
    email: '',
    password: '',
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('form submited');
    resetFormFields();
  };

  return (
    <div className={styles.Login_Container}>
      <Link to="/login/">SignUp</Link>
      <Link to="/signup/">SignUp</Link>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          required
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          type="password"
          required
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />

        <span>Sign in with your email and password</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
