/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import { LoginSchema } from 'schemas/index';
import { availableRoutesList } from 'routes/availableRoutesList';

import styles from './login.module.scss';

function Login() {
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
            Login
          </NavLink>
          <NavLink
            to={availableRoutesList.SIGN_UP}
            className={({ isActive }) =>
              isActive ? styles.Form_Link_Active : styles.Form_Link
            }
          >
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
              toast.success(JSON.stringify(values, null, 1));
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

              <button
                className={styles.Btn}
                type="submit"
                disabled={!dirty || isSubmitting}
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

export default Login;
