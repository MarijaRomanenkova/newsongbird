/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { SignUpSchema } from 'schemas/index';
import { availableRoutesList } from 'routes/availableRoutesList';

import styles from './signup.module.scss';

function SignUpForm() {
  const { t } = useTranslation();
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
            {t('login')}
          </NavLink>
          <NavLink
            to={availableRoutesList.SIGN_UP}
            className={({ isActive }) =>
              isActive ? styles.Form_Link_Active : styles.Form_Link
            }
          >
            {t('signup')}
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
                {t('email')}
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
                {t('form-password')}
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
                {(msg) => t({ msg })}
              </ErrorMessage>

              <label htmlFor="confirm-password" className={styles.Form_Label}>
                {t('form-password-confirmation')}
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
                {(msg) => t({ msg })}
              </ErrorMessage>

              <ErrorMessage name="acceptTerms" className={styles.Error}>
                {(msg) => t({ msg })}
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
                  {t('signup-message')}
                  <a href="#" className={styles.Checkbox_Label_Link}>
                    {t('signup-link')}
                  </a>
                  {t('signup-message-2')}
                </label>
              </div>
              <button
                className={styles.Btn}
                disabled={!dirty || isSubmitting || Object.keys(errors).length}
                type="submit"
              >
                {t('submit')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default SignUpForm;
