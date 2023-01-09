import React from 'react';
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';

// not less than 5 charecters, contains at least one uppercase and lowercase letter, and one special charecter//
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email(
      <FormattedMessage
        id="email_validation"
        defaultMessage="Please enter valid email"
      />
    )
    .required(),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'email_riminder-error' })
    .required(),
});

export const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email(
      <FormattedMessage
        id="email_validation"
        defaultMessage="Please enter valid email"
      />
    )
    .required(),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'password-creation-error' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'email-math_error')
    .required('Required'),
  acceptTerms: yup.boolean().oneOf([true], 'accept-terms_error'),
});
