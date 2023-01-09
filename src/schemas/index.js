import React from 'react';
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';

// not less than 5 charecters, contains at least one uppercase and lowercase letter, and one special charecter//
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const LoginSchema = yup.object().shape({
  email: yup.string().email(<FormattedMessage id="email_validation" defaultMessage="email" />).required(),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message: <FormattedMessage id="email_match-error_message" defaultMessage="Riminder your password is at least 5 charecters long, includes at least one special carachter,lowercase and one uppercaseletter" />,
    })
    .required(),
});

export const SignUpSchema = yup.object().shape({
  email: yup.string().email(<FormattedMessage id="email_validation" defaultMessage="email" />).required(),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'Please accept the terms of service'),
});
