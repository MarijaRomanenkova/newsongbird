/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { LoginSchema } from 'schemas/index';
import { availableRoutesList } from 'routes/availableRoutesList';

import styles from './login.module.scss';

function Login() {
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
              {touched.email && errors.email && (
                <div className={styles.Error}>{t('email-match-error')}</div>
              )}

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
              {touched.password && errors.password &&  (
                <div className={styles.Error}>{t('email-reminder-error')}</div>
              )}
              <button
                className={styles.Btn}
                type="submit"
                disabled={!dirty || isSubmitting || Object.keys(errors).length}
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

export default Login;
