import { render, screen } from '@testing-library/react'
import { ExpenseItem } from '.'
import { Expense } from '../../../hooks/HomePage/expenses.types'

const mockClick = jest.fn()
const expense: Expense = {
  amount: 10000,
  date: new Date('Wed Mar 02 2022 14:22:54 GMT-0500 (Colombia Standard Time)'),
  description: 'Testing expense',
  type: 'expense',
}

describe('<ExpenseItem/>', () => {
  it('should render correctly', () => {
    render(<ExpenseItem {...expense} onClick={mockClick} />)
    expect(screen.getByText(expense.description)).toBeInTheDocument()
    expect(screen.getByText('miércoles 02')).toBeInTheDocument()
    expect(screen.getByText('$ 10.000')).toBeInTheDocument()
  })
  it('should render the expenses in a red color', () => {
    render(<ExpenseItem {...expense} onClick={mockClick} />)
    const value = screen.getByText('$ 10.000')
    expect(value).toHaveClass('text-red-500')
  })
  it('should render the income in a green color', () => {
    expense.type = 'income'
    render(<ExpenseItem {...expense} onClick={mockClick} />)
    const value = screen.getByText('$ 10.000')
    expect(value).toHaveClass('text-emerald-500')
  })
})
