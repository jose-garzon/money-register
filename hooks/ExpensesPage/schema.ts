import Joi from 'joi'

const ExpenseSchema = Joi.object({
  id: Joi.string().optional().allow(''),
  description: Joi.string().required().messages({
    'string.empty': 'Este campo es requerido',
  }),
  amount: Joi.string().required().messages({
    'string.empty': 'Este campo es requerido',
    'string.base': 'Este campo es requerido',
    'any.required': 'Este campo es requerido',
  }),
  date: Joi.date().required().messages({
    'any.required': 'Este campo es requerido',
    'date.base': 'Este campo es requerido',
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Este campo es requerido',
    'string.base': 'Este campo es requerido',
  }),
  tag: Joi.alternatives().conditional('type', {
    is: 'expense',
    then: Joi.string().required().messages({
      'string.empty': 'Este campo es requerido',
      'string.base': 'Este campo es requerido',
    }),
    otherwise: Joi.string().allow(''),
  }),
})

export { ExpenseSchema }
