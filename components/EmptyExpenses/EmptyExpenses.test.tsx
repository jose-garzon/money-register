import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmptyExpenses } from '.'

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      push: mockPush,
    }
  },
}))

describe('<EmptyExpenses/>', () => {
  it('should render the component', () => {
    render(<EmptyExpenses />)
    const title = screen.getByRole('heading', {
      name: 'Aún no tienes registros',
    })
    expect(title).toBeInTheDocument()
  })
  it('should redirect to expenses pages', () => {
    render(<EmptyExpenses />)
    userEvent.click(screen.getByRole('button'))
    expect(mockPush).toHaveBeenCalled()
  })
})
