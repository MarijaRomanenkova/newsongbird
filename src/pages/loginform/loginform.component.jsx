/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { LoginSchema } from 'schemas/index';

import styles from './loginform.module.scss';

function Login() {
  return (
    <div className={styles.Form_Container}>
      <div className={styles.Form_Wrapper}>
        <div className={styles.Form_Link_Wrapper}>
          <NavLink to="/login/" className={styles.Form_Link}>
            Login
          </NavLink>
          <NavLink to="/signup/" className={styles.Form_Link}>
            SignUp
          </NavLink>
        </div>

        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <label htmlFor="email" className={styles.Form_Label}>
              Email Address
            </label>
            <Field
              name="email"
              id="email "
              type="email"
              className={styles.Form_Input}
            />
            <ErrorMessage name="email" className={styles.Error} />

            <label htmlFor="password" className={styles.Form_Label}>
              Password
            </label>
            <Field
              name="password"
              type="password"
              id="password"
              className={styles.Form_Input}
            />
            <ErrorMessage name="password" className={styles.Error} />
            <button className={styles.Btn} type="submit">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default Login;
