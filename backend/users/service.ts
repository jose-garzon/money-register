import { DBTypes } from '../../lib/db'
import bcrypt from 'bcrypt'
import authService from '../auth'

interface UserType {
  email: string
  name: string
  lastname: string
  password: string
}

const usersService = (db: DBTypes) => {
  const getUser = async (email: string) => {
    try {
      return await db.queryOne({ email })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const createUser = async (newUser: UserType) => {
    const { password, email, ...rest } = newUser
    try {
      const existingUser = await getUser(email)
      if (existingUser)
        return Promise.reject(new Error('This user already exists'))

      const createdUser = await db.create({ email, ...rest })
      await authService.createAuth({
        email,
        password: await bcrypt.hash(password, 10),
      })
      return createdUser
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { createUser, getUser }
}

export default usersService
