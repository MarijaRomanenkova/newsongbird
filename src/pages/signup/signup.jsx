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
            <FormattedMessage id="signup" defaultMessage="Sign Up" />
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
                <FormattedMessage id="email" defaultMessage="Email adress" />
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
                <FormattedMessage
                  id="form-password"
                  defaultMessage="Password"
                />
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
                {(msg) => (
                  <FormattedMessage
                    id={msg}
                    defaultMessage="Please create a stronger password"
                  />
                )}
              </ErrorMessage>

              <label htmlFor="confirm-password" className={styles.Form_Label}>
                <FormattedMessage
                  id="form-password-confirmation"
                  defaultMessage="Password"
                />
              </label>
              <Field
                name="confirmPassword"
                id="confirm-password"
                type="password"
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? styles.Form_Input_Error
                    : styles.Form_Input
                }
              />
              <ErrorMessage name="confirmPassword" className={styles.Error}>
                {(msg) => (
                  <FormattedMessage
                    id={msg}
                    defaultMessage="Passwords must match"
                  />
                )}
              </ErrorMessage>

              <ErrorMessage name="acceptTerms" className={styles.Error}>
                {(msg) => (
                  <FormattedMessage
                    id={msg}
                    defaultMessage="Please accept terms"
                  />
                )}
              </ErrorMessage>
              <div className={styles.Checkbox_Container}>
                <Field
                  name="accept-terms"
                  control="checkbox"
                  type="checkbox"
                  id="accept-terms"
                  className="styles.Checkbox_Container_Box"
                />

                <label htmlFor="accept-terms" className={styles.Checkbox_Label}>
                  <FormattedMessage
                    id="signup-message"
                    defaultMessage="By creating an account you agree to the"
                  />{' '}
                  <a href="#" className={styles.Checkbox_Label_Link}>
                    <FormattedMessage
                      id="signup-link"
                      defaultMessage="terms and conditions"
                    />
                  </a>{' '}
                  <FormattedMessage
                    id="signup-message-2"
                    defaultMessage="applicable to our sevice and acknowledge that your personal data will be used in accordance with our privacy policy and you will receive emails and communications about jobs, industry news, new products and related topics."
                  />
                </label>
              </div>
              <button
                className={styles.Btn}
                disabled={!dirty || isSubmitting || Object.keys(errors).length}
                type="submit"
              >
                <FormattedMessage id="submit" defaultMessage="Submit" />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default SignUpForm;
