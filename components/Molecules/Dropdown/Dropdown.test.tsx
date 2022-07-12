import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { Dropdown } from '.'

const options = [{ label: 'Test', value: 'test_id' }]

const TestDropdown = () => {
  const { control } = useForm()
  return (
    <Dropdown control={control} name="test" label="Test" options={options} />
  )
}

describe('<Dropdown/>', () => {
  it('should render', () => {
    render(<TestDropdown />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
  it('should show the menu options on focus', () => {
    render(<TestDropdown />)
    const input = screen.getByRole('textbox')
    userEvent.tab()
    expect(input).toHaveFocus()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})
