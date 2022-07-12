import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '.'

const mockBack = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      back: mockBack,
    }
  },
}))

describe('<Header>', () => {
  it('should render correctly', () => {
    render(<Header />)
    expect(screen.getByText(/expenses/i)).toBeInTheDocument()
  })
  it('should send the go back function by clicking the arrow', () => {
    render(<Header />)
    userEvent.click(screen.getByRole('go-back'))
    expect(mockBack).toBeCalled()
  })
})
