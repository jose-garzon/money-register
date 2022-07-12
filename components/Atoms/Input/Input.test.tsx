import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '.'

describe('<Input/>', () => {
  it('should render the label', () => {
    render(<Input label="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
  it('should render the show password icon and change it to hide', () => {
    render(<Input label="Test" type="password" />)
    const showPassword = screen.getByRole('show-password')
    expect(showPassword).toBeInTheDocument()
    userEvent.click(showPassword)
    const hidePassword = screen.getByRole('hide-password')
    expect(hidePassword).toBeInTheDocument()
    userEvent.click(hidePassword)
    expect(screen.getByRole('show-password')).toBeInTheDocument()
  })
  it('should show the error state', () => {
    render(
      <Input
        label="Test"
        name="test"
        type="text"
        errors={{ test: { type: 'test error', message: 'Test error' } }}
      />
    )
    const errorLabel = screen.getByRole('input-error')
    expect(errorLabel).toBeInTheDocument()
  })
  it('should show not allow to type numbers nor special chars in a text input', () => {
    render(<Input label="Test" type="text" />)
    const input = screen.getByRole('textbox')
    userEvent.clear(input)
    userEvent.type(input, 'Testing1234!@#$%')
    expect(input).toHaveValue('Testing')
  })
  it('should show not allow to type words in a number input', () => {
    render(<Input label="Test" type="number" />)
    const input = screen.getByRole('spinbutton')
    userEvent.clear(input)
    userEvent.type(input, 'Testing1234')
    expect(input).toHaveValue(1234)
  })
})
