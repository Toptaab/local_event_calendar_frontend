import Joi from 'joi';

const organizerRegisterSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .trim()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Email should be in email format',
    }),
  userName: Joi.string().required().trim().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.required': 'Confirm password is required',
    'string.empty': 'Confirm password is required',
    'any.only': 'Password and confirm password should be matched ',
  }),
  gender: Joi.string().required().trim().messages({
    'any.required': 'Gender is required',
    'string.empty': 'Gender is required',
  }),
  corporation: Joi.string().required().trim().messages({
    'any.required': 'Entity type is required',
    'string.empty': 'corporation is required',
  }),
  officialName: Joi.string().required().trim().messages({
    'any.required': 'Official name is required',
    'string.empty': 'Official Name is required',
  }),
});

const userRegisterSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .trim()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email should be in email format',
    }),
  userName: Joi.string()
    .required()
    .trim()
    .messages({ 'string.empty': 'Username is required' }),
  password: Joi.string()
    .required()
    .messages({ 'string.empty': 'Password is required' }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.empty': ' Confirm password is required',
    'any.only': 'Password and confirm password should be matched ',
  }),
  gender: Joi.string()
    .required()
    .trim()
    .messages({ 'string.empty': 'gender is required' }),
  role: Joi.string()
    .required()
    .trim()
    .messages({ 'string.empty': 'role is required' }),
});

export const validateOrganizerRegister = (input) => {
  const { error } = organizerRegisterSchema.validate(input, {
    abortEarly: false,
  });
  console.dir(error);

  const errorObject = {};
  error?.details.map((el) => {
    errorObject[el.path[0]] = el.message;
    return null;
  });

  return errorObject;
};

export const validateUserRegister = (input) => {
  const { error } = userRegisterSchema.validate(input, { abortEarly: false });

  const errorObject = {};
  const temp = error?.details.map((el) => {
    errorObject[el.path[0]] = el.message;
    return null;
  });
  console.log('error object is here!!!!');
  console.log(temp);

  return errorObject;
};

export const temp = () => {};
