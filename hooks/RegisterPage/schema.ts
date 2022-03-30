import Joi from 'joi'

const RegisterSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Este campo es requerido',
  }),
  lastname: Joi.string().required().messages({
    'string.empty': 'Este campo es requerido',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Este campo es requerido',
      'string.email': 'Formato del email inválido',
    }),
  password: Joi.string().required().messages({
    'string.empty': 'Este campo es requerido',
  }),
  confirm_password: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .messages({
      'string.empty': 'Este campo es requerido',
      'any.only': 'Las contraseñas no son iguales',
    }),
})

export { RegisterSchema }
