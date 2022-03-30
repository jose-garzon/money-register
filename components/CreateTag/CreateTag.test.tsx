import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CreateTag } from '.'

describe('<CreateTag/>', () => {
  const deleteFunction = jest.fn()
  it('render the tab label', () => {
    render(<CreateTag onDelete={deleteFunction} label="Test" id="test-id" />)
    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })
  it('should start the editing mode', () => {
    render(<CreateTag onDelete={deleteFunction} label="Test" id="test-id" />)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    const editButton = screen.getByRole('edit-icon')
    userEvent.click(editButton)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('cancel-editing-icon')).toBeInTheDocument()
    expect(screen.getByRole('save-tag-icon')).toBeInTheDocument()
  })
  it('should type the new value', () => {
    render(<CreateTag onDelete={deleteFunction} label="Test" id="test-id" />)
    const editButton = screen.getByRole('edit-icon')
    userEvent.click(editButton)
    const input = screen.getByRole('textbox')
    userEvent.clear(input)
    userEvent.type(input, 'new label')
    expect(input).toHaveValue('new label')
  })
  it('should finish the editing mode', () => {
    render(<CreateTag onDelete={deleteFunction} label="Test" id="test-id" />)
    userEvent.click(screen.getByRole('edit-icon'))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    userEvent.click(screen.getByRole('cancel-editing-icon'))
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })
  it('should send the delete tag function', () => {
    render(<CreateTag onDelete={deleteFunction} label="Test" id="test-id" />)
    const deleteButton = screen.getByRole('delete-tag-icon')
    userEvent.click(deleteButton)
    expect(deleteFunction).toHaveBeenCalled()
  })
})
