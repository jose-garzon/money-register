import db from '../../lib/db'
import expensesService from './service'
import expensesModel from './model'

const service = expensesService(db(expensesModel))

export default service
