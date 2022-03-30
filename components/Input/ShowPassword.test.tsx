import { render, screen } from '@testing-library/react'
import { ShowPassword } from './ShowPassword'

describe('<ShowPassword/>', () => {
  it('should show only the show eye icon', () => {
    render(<ShowPassword type="password" />)
    expect(screen.getByRole('show-password')).toBeInTheDocument()
    expect(screen.queryByRole('hide-password')).not.toBeInTheDocument()
  })
  it('should show only the hide eye icon', () => {
    render(<ShowPassword type="text" />)
    expect(screen.queryByRole('show-password')).not.toBeInTheDocument()
    expect(screen.getByRole('hide-password')).toBeInTheDocument()
  })
})
