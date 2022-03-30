import axios from 'axios'
import type { Expense } from '../hooks/HomePage/expenses.types'

interface ExpensesQueryParams {
  tags?: string[]
  email: string
  date: Date
}

const getExpenses = async (query: ExpensesQueryParams) => {
  const { data } = await axios.get<Expense[]>('/api/expenses', {
    params: query,
  })
  return data
}

const getExpenseDetail = async (id: string) => {
  const { data } = await axios.get<Expense>(`/api/expenses/${id}`)
  return data
}

const postExpense = (expense: Expense & { email: string }) =>
  axios.post('/api/expenses', expense)

const putExpense = ({ id, ...rest }: Expense) => {
  const body = { ...rest }
  return axios.put(`/api/expenses/${id}`, body)
}

const deleteExpense = (id: string) => axios.delete(`/api/expenses/${id}`)

const getTotal = (email: string) =>
  axios.get('/api/expenses/total', { params: { email } })

export {
  getExpenses,
  postExpense,
  getTotal,
  getExpenseDetail,
  putExpense,
  deleteExpense,
}
