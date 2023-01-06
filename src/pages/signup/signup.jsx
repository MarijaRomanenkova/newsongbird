/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import 'react-toastify/dist/ReactToastify.css';

import { SignUpSchema } from 'schemas/index';
import { availableRoutesList } from 'routes/availableRoutesList';

import styles from './signup.module.scss';

function SignUpForm() {
  return (
    <div className={styles.Form_Container}>
      <div className={styles.Form_Wrapper}>
        <div className={styles.Form_Link_Wrapper}>
          <NavLink
            to={availableRoutesList.LOGIN}
            className={({ isActive }) =>
              isActive ? styles.Form_Link_Active : styles.Form_Link
            }
          >
            <FormattedMessage id="login" defaultMessage="Login" />
          </NavLink>
          <NavLink
            to={availableRoutesList.SIGN_UP}
            className={({ isActive }) =>
              isActive ? styles.Form_Link_Active : styles.Form_Link
            }
          >
          <FormattedMessage id="signUp" defaultMessage="Sign Up" />
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
              toast.success(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 5000);
          }}
        >
          {({ errors, touched, dirty, isSubmitting }) => (
            <Form>
              <label htmlFor="email" className={styles.Form_Label}>
                Email Address
              </label>
              <Field
                name="email"
                id="email "
                type="email"
                className={
                  errors.email && touched.email
                    ? styles.Form_Input_Error
                    : styles.Form_Input
                }
              />
              <ErrorMessage name="email" className={styles.Error}>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>

              <label htmlFor="password" className={styles.Form_Label}>
                Password
              </label>
              <Field
                name="password"
                type="password"
                id="password"
                className={
                  errors.password && touched.password
                    ? styles.Form_Input_Error
                    : styles.Form_Input
                }
              />
              <ErrorMessage name="password" className={styles.Error}>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>

              <label htmlFor="confirmPassword" className={styles.Form_Label}>
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? styles.Form_Input_Error
                    : styles.Form_Input
                }
              />
              <ErrorMessage name="confirmPassword" className={styles.Error}>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>

              <ErrorMessage name="acceptTerms" className={styles.Error}>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
              <div className={styles.Checkbox_Container}>
                <Field
                  name="acceptTerms"
                  control="checkbox"
                  type="checkbox"
                  id="acceptTerms"
                  className="styles.Checkbox_Container_Box"
                />

                <label htmlFor="acceptTerms" className={styles.Checkbox_Label}>
                  By creating an account you agree to the{' '}
                  <a href="#" className={styles.Checkbox_Label_Link}>
                    terms and conditions
                  </a>{' '}
                  applicable to our sevice and acknowledge that your personal
                  data will be used in accordance with our privacy policy and
                  you will receive emails and communications about jobs,
                  industry news, new products and related topics.
                </label>
              </div>
              <button
                className={styles.Btn}
                disabled={!dirty || isSubmitting || Object.keys(errors).length}
                type="submit"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default SignUpForm;
