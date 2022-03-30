import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import expensesService from '../../../backend/expenses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req
  const expenseId = query.id as string
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'Unauthorized user' })

  if (method === 'GET') {
    try {
      const expenses = await expensesService.getExpenseDetail(expenseId)
      res.status(200).json(expenses)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  if (method === 'PUT') {
    try {
      const expenses = await expensesService.putExpense(expenseId, body)
      res.status(200).json(expenses)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  if (method === 'DELETE') {
    try {
      const expenses = await expensesService.deleteExpense(expenseId)
      res.status(200).json(expenses)
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}
