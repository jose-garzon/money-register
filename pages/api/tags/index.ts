import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import tagsService from '../../../backend/tags'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req
  const email = query.email as string
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized user' })
  }

  if (method === 'GET') {
    try {
      const tags = await tagsService.getTags(email)
      res.status(200).json(tags)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  if (method === 'POST') {
    try {
      const tags = await tagsService.postTag(body)
      res.status(201).json(tags)
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}
