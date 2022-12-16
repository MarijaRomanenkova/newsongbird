import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';

import styles from './loginform.module.scss';

function LoginForm() {

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
    <Link to='/signup'>SignUp</Link>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
    </>
  );
}
export default LoginForm;
