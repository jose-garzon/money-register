import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExpenseRadio } from './ExpenseRadio'

describe('<ExpenseRadio/>', () => {
  it('should check the input', () => {
    render(
      <ExpenseRadio
        id="test"
        label="Test"
        expenseType="expense"
        checked={false}
      />
    )
    const radioInput = screen.getByRole('radio')
    expect(radioInput).not.toBeChecked()
    userEvent.click(screen.getByText('Test'))
    expect(radioInput).toBeChecked()
  })
})
