import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '.'

describe('<Modal/>', () => {
  it('should show the modal when is open', () => {
    render(<Modal title="Testing" open={true} />)
    const modal = screen.getByRole('presentation')
    expect(modal).toBeInTheDocument()
  })
  it('should hide the modal when is not open', () => {
    render(<Modal title="Testing" open={false} />)
    const modal = screen.queryByRole('presentation')
    expect(modal).not.toBeInTheDocument()
  })
  it('should dispatch the close function', () => {
    const closeMock = jest.fn()
    render(<Modal title="Testing" open={true} close={closeMock} />)
    const closeButton = screen.getByRole('close')
    userEvent.click(closeButton)
    expect(closeMock).toHaveBeenCalledTimes(1)
  })
})
