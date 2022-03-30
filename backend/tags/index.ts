import db from '../../lib/db'
import tagsService from './service'
import tagsModel from './model'

const service = tagsService(db(tagsModel))

export default service
