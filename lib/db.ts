import { Model } from 'mongoose'
import { dbConnect } from './dbConnect'

type Obj = { [key: string]: any }
interface DBTypes {
  query: (query?: Obj, sort?: Obj) => Promise<any>
  queryOne: (entity?: Obj) => Promise<any>
  create: (entity?: Obj) => Promise<any>
  update: (id: string, entity?: Obj) => Promise<any>
  deleteOne: (query?: Obj) => Promise<any>
}

const db = (model: typeof Model): DBTypes => {
  const query = async (query?: Obj, sort?: Obj) => {
    try {
      await dbConnect()
      return await model.find(query ?? {}).sort(sort ?? {})
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const queryOne = async (query?: Obj) => {
    try {
      await dbConnect()
      return await model.findOne(query ?? {})
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const create = async (entity?: Obj) => {
    try {
      await dbConnect()
      return await model.create(entity)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const update = async (id: string, entity?: Obj) => {
    try {
      await dbConnect()
      return await model.updateOne({ _id: id }, entity)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const deleteOne = async (query?: Obj) => {
    try {
      await dbConnect()
      return await model.deleteOne(query)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { query, create, queryOne, deleteOne, update }
}

export default db
export type { DBTypes }
