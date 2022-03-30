import { DBTypes } from '../../lib/db'
import bcrypt from 'bcrypt'
import usersService from '../users'

interface AuthType {
  email: string
  password: string
}

const authService = (db: DBTypes) => {
  const createAuth = async (newAuth: AuthType) => {
    try {
      return await db.create(newAuth)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const login = async (credentials: AuthType) => {
    try {
      const auth = await db.queryOne({ email: credentials.email })
      const authenticated = await bcrypt.compare(
        credentials.password,
        auth.password
      )
      if (authenticated) return await usersService.getUser(credentials.email)
      return Promise.reject(new Error('Invalid credentials'))
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { createAuth, login }
}

export default authService
