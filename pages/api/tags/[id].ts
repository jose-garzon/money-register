import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import tagsService from '../../../backend/tags'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req
  const id = query.id as string
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized user' })
  }

  if (method === 'PUT') {
    try {
      const tag = await tagsService.updateTag(id, body)
      res.status(200).json(tag)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  if (method === 'DELETE') {
    try {
      const deletedTag = await tagsService.deleteTag(id)
      res.status(200).json(deletedTag)
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}
