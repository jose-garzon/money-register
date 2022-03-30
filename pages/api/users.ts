import type { NextApiRequest, NextApiResponse } from 'next'
import usersService from '../../backend/users'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  if (method === 'POST') {
    try {
      const user = await usersService.createUser(body)
      res.status(201).json(user)
    } catch (error) {
      const err = error as Error
      res.status(400).json({ code: 'user.exists', message: err.message })
    }
  }
}
