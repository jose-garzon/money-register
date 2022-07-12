import { render, screen } from '@testing-library/react'
import { FaCheck } from 'react-icons/fa'
import { Button } from '.'

describe('<Button/>', () => {
  it('should render conrrectly', () => {
    render(<Button>Test</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Test')
  })
  it('should the outlined version', () => {
    render(<Button variant="outline">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('outline')
  })
  it('should render the start icon', () => {
    render(<Button startIcon={FaCheck}>Test</Button>)
    expect(screen.getByRole('start-icon')).toBeInTheDocument()
  })
})
