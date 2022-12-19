/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';

import { SignUpSchema } from 'schemas/index';

import styles from './signup.module.scss';

// const onSubmit = async (values, actions) => {
//   console.log(values);
//   console.log(actions);
//   // eslint-disable-next-line no-promise-executor-return
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   actions.resetForm();
// };

const onSubmit = () => {
  console.log('submited');
};

function SignUpForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema: SignUpSchema,
    onSubmit,
  });

  console.log(errors);

  return (
    <div className={styles.Form_Container}>
      <div className={styles.Form_Link_Wrapper}>
        <NavLink to="/login/" className={styles.Form_Link}>
          Login
        </NavLink>
        <NavLink to="/signup/" className={styles.Form_Link}>
          SignUp
        </NavLink>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="email" className={styles.Form_Label}>
          Email
        </label>
        <input
          value={values.email}
          onChange={handleChange}
          id="email"
          type="email"
          placeholder="Enter your email"
          onBlur={handleBlur}
          className={errors.email && touched.email ? styles.Input_Error : ''}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}

        {errors.password && touched.password && (
          <p className={styles.Error}>{errors.password}</p>
        )}
        <label htmlFor="password" className={styles.Form_Label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.password && touched.password ? styles.Input_Error : ''
          }
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
        <label htmlFor="confirmPassword" className={styles.Form_Label}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.confirmPassword && touched.confirmPassword
              ? styles.Input_Error
              : ''
          }
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <div >
          <input
            name="acceptTerms"
            type="checkbox"
            className={
              errors.acceptTerms && touched.acceptTerms
                ? styles.Input_Error
                : ''
            }
            onChange={handleChange}
            value={values.acceptTerms}
          />
          <label htmlFor="acceptTerms" className={styles.Form_Check_Label}>
            I have read and agree to the Terms
          </label>
          <div className="invalid-feedback">
            {errors.acceptTerms && touched.acceptTerms
              ? errors.acceptTerms
              : null}
          </div>
        </div>

        <button disabled={isSubmitting} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default SignUpForm;
