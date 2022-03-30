import { render, screen } from '@testing-library/react'
import { ExpensesLoader } from '.'

describe('<ExpensesLoader/>', () => {
  it('should show the correct amount of loaders', () => {
    render(<ExpensesLoader amount={3} />)
    const loaders = screen.getAllByRole('loader')
    expect(loaders).toHaveLength(3)
  })
  it('should show no loaders', () => {
    render(<ExpensesLoader amount={0} />)
    const loaders = screen.queryByRole('loader')
    expect(loaders).not.toBeInTheDocument()
  })
  it('should show no loaders if amount is negative', () => {
    render(<ExpensesLoader amount={-1} />)
    const loaders = screen.queryByRole('loader')
    expect(loaders).not.toBeInTheDocument()
  })
})
