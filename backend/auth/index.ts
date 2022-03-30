import db from '../../lib/db'
import authService from './service'
import authModel from './model'

const service = authService(db(authModel))

export default service
