import { endOfMonth, startOfMonth } from 'date-fns'
import { ObjectId } from 'mongoose'
import { Expense } from '../../hooks/HomePage/expenses.types'
import { DBTypes } from '../../lib/db'

type Tags = string | string[] | undefined
interface ExpensesQuery {
  email: string
  tag?: { $in: string[] }
  date: { $gte: Date; $lte: Date }
}

interface ExpensesDB {
  _id: ObjectId
  amount: number
  date: Date
  description: string
  email: string
  tag: string
  type: string
  __v: number
}
interface ReturnExpense {
  id: string
  amount: number
  date: string
  description: string
  type: string
  tag?: string
}

const expensesService = (db: DBTypes) => {
  const getExpenses = async (email: string, tags: Tags, date: string) => {
    const query: ExpensesQuery = {
      email,
      date: {
        $gte: startOfMonth(new Date(date)),
        $lte: endOfMonth(new Date(date)),
      },
    }
    if (tags) {
      if (Array.isArray(tags)) query.tag = { $in: tags }
      else query.tag = { $in: [tags] }
    }
    try {
      const data: ExpensesDB[] = await db.query(query, { date: -1 })
      const formatted = data.map((expenses) => {
        const response: ReturnExpense = {
          id: expenses['_id'].toString(),
          amount: expenses.amount,
          date: expenses.date.toString(),
          description: expenses.description,
          type: expenses.type,
        }
        if (expenses.tag) response.tag = expenses.tag
        return response
      })
      return formatted
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const calculateTotal = async (email: string) => {
    try {
      const expenses = (await db.query({ email })) as Expense[]
      const total = expenses.reduce((acc, curr) => {
        if (curr.type === 'income') acc += curr.amount
        else acc -= curr.amount
        return acc
      }, 0)
      return total
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const getExpenseDetail = async (id: string) => {
    try {
      const data = await db.queryOne({ _id: id })
      const formattedData = {
        id: data['_id'].toString(),
        amount: data.amount,
        date: data.date,
        description: data.description,
        tag: data.tag,
        type: data.type,
      }
      return formattedData
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const postExpense = async (expense: Expense & { email: string }) => {
    try {
      const data = await db.create(expense)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const putExpense = async (id: string, body: Expense) => {
    try {
      const data = await db.update(id, body)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const deleteExpense = async (id: string) => {
    try {
      const data = await db.deleteOne({ _id: id })
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    calculateTotal,
    deleteExpense,
    getExpenseDetail,
    getExpenses,
    postExpense,
    putExpense,
  }
}

export default expensesService
