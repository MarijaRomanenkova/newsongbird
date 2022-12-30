import * as yup from 'yup';

// not less than 5 charecters, contains at least one uppercase and lowercase letter, and one special charecter//

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required(),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        'Riminder your password is at least 5 charecters long, includes at least one special carachter,lowercase and one uppercaseletter',
    })
    .required(),
});

export const SignUpSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required(),
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
