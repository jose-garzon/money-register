import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import expensesService from '../../../backend/expenses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req
  const email = query.email as string
  const tags = query['tags[]'] as string[]
  const date = query.date as string
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'Unauthorized user' })

  if (method === 'GET') {
    try {
      const expenses = await expensesService.getExpenses(email, tags, date)
      res.status(200).json(expenses)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  if (method === 'POST') {
    try {
      const expenses = await expensesService.postExpense(body)
      res.status(201).json(expenses)
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}
