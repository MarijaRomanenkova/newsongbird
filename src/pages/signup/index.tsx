import React from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { availableRoutesList } from 'app/routes/available-routes-list';
import { SignUpSchema } from './schema';

import styles from './index.module.scss';

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
              {touched.email && errors.email && (
                <div className={styles.Error}>{t('email-validation')}</div>
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
              {touched.password && errors.password ? (
                <div className={styles.Error}>
                  {t('password-creation-error')}
                </div>
              ) : null}

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
              {touched.confirmPassword && errors.confirmPassword && (
                <div className={styles.Error}>{t('email-match-error')}</div>
              )}

              <div className={styles.Checkbox_Container}>
                <Field
                  name="acceptTerms"
                  control="checkbox"
                  type="checkbox"
                  id="acceptTerms"
                  className="styles.Checkbox_Container_Box"
                />

                <label htmlFor="acceptTerms" className={styles.Checkbox_Label}>
                  {t('signup-message')}
                  <a href="/" className={styles.Checkbox_Label_Link}>
                    {t('signup-link')}
                  </a>
                  {t('signup-message-2')}
                </label>
              </div>
              <button
                className={styles.Btn}
                disabled={
                  !dirty || isSubmitting || Object.keys(errors).length > 0
                }
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
