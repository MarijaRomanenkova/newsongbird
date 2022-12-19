/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';

import { useFormik } from 'formik';

import styles from './loginform.module.scss';

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <NavLink to="/login/" className={styles.SignUp_Link}>
        Login
      </NavLink>
      <NavLink to="/signup/" className={styles.SignUp_Link}>
        SignUp
      </NavLink>
      <form onSubmit={formik.handleSubmit} className={styles.Group}>
        <label htmlFor="email" className={styles.Form_InputLabel}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className={styles.Form_Input}
        />

        <label htmlFor="password" className={styles.Form_InputLabel}>
          Email Address
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className={styles.Form_Input}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
export default LoginForm;
