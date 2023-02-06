import * as yup from 'yup';

// not less than 5 charecters, contains at least one uppercase and lowercase letter, and one special charecter//

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required(),
  password: yup.string().min(5).matches(passwordRules).required(),
});
