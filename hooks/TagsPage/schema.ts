import Joi from 'joi'

const CreateTagSchema = Joi.object({ search: Joi.string() })

export { CreateTagSchema }
