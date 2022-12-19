/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { SignUpSchema } from 'schemas/index';

import styles from './signup.module.scss';

function SignUpForm() {
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
          validationSchema={SignUpSchema}
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

            <label htmlFor="confirmPassword" className={styles.Form_Label}>
              Confirm Password
            </label>
            <Field
              name="confirmPassword"
              id="confirmPassword"
              type="text"
              className={styles.Form_Input}
            />
            <ErrorMessage name="confirmPassword" className={styles.Error} />

            <Field
              name="acceptTerms"
              type="checkbox"
              className={styles.Checkbox}
              id="acceptTerms"
            />
            <label htmlFor="confirmPassword" className={styles.Form_Label}>
              By creating an account you agree to the{' '}
              <a href="#" className={styles.Form_Label_Link}>
                terms and conditions
              </a>
              {' '}applicable to our sevice and acknowledge that your personal data
              will be used in accordance with our privacy policy and you will
              receive emails and communications about jobs, industry news, new
              products and related topics.
            </label>
            <ErrorMessage name="acceptTerms" className={styles.Error} />

            <button className={styles.Btn} type="submit">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default SignUpForm;
