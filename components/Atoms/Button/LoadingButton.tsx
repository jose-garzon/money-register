import { FC } from 'react'
import { Button, ButtonProps } from './Button'

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean
}

const LoadingButton: FC<LoadingButtonProps> = ({
  children,
  isLoading,
  ...rest
}) => {
  return (
    <Button {...rest} disabled={isLoading}>
      {isLoading ? 'Loading...' : children}
    </Button>
  )
}
export { LoadingButton }
