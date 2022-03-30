import { ObjectId } from 'mongoose'
import { DBTypes } from '../../lib/db'

interface TagsDB {
  name: string
  email: string
  _id: ObjectId
}

const tagsService = (db: DBTypes) => {
  const getTags = async (email: string) => {
    try {
      const data: TagsDB[] = await db.query({ email })
      const formatted = data.map((tag) => ({
        name: tag.name,
        id: tag['_id'].toString(),
      }))
      return formatted
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const postTag = async (body: { name: string; email: string }) => {
    try {
      const data = await db.create(body)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const updateTag = async (id: string, body: { name: string }) => {
    try {
      const data = await db.update(id, body)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const deleteTag = async (id: string) => {
    try {
      const data = await db.deleteOne({ _id: id })
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { getTags, postTag, deleteTag, updateTag }
}

export default tagsService
