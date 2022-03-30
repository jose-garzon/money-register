import Joi from 'joi'

const LoginSchema = Joi.object({
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
})

export { LoginSchema }
