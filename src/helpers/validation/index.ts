import * as yup from 'yup';

export const passwordSchema = yup
  .string()
  .required()
  .matches(/(?=.*[A-Z])/, 'Uppercase letter')
  .matches(/(?=.*[0-9])/, 'Number')
  .matches(/(?=.*[a-z])/, 'Lowercase letter')
  .matches(/(?=.{8,})/, '8 or more characters');

export const userSchema = yup.object().shape({
  email: yup.string().email(),
  password: passwordSchema,
});
