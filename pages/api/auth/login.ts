import type { NextApiRequest, NextApiResponse } from 'next'
import authService from '../../../backend/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  if (method !== 'POST') return res.status(405).end()
  try {
    const loggedUser = await authService.login(body)
    res.status(200).json(loggedUser)
  } catch (error) {
    res.status(401).json({ message: error })
  }
}
