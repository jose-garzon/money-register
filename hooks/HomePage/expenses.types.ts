import { Session } from 'next-auth'
import { Tag } from '../TagsPage/tags.types'

interface Expense {
  id?: string
  amount: string
  date: Date
  description: string
  type: 'income' | 'expense'
  tag?: string
}

interface HomeProps {
  session: Session
  tags: Tag[]
  expenses: Expense[]
}

export type { Expense, HomeProps }
