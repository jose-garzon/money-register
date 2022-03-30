import db from '../../lib/db'
import usersService from './service'
import usersModel from './model'

const service = usersService(db(usersModel))

export default service
