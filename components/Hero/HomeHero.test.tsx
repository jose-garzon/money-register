import { render, screen } from '@testing-library/react'
import { HomeHero } from '.'

describe('<HomeHero/>', () => {
  it('should render correctly', () => {
    render(<HomeHero total="$ 100.000" />)
    expect(screen.getByRole('heading', { name: 'Total:' })).toBeInTheDocument()
    expect(screen.getByText('$ 100.000')).toBeInTheDocument()
  })
})
