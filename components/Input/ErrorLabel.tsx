import { FC } from 'react'

interface ErrorLabelProps {
  error: string | undefined
}

const ErrorLabel: FC<ErrorLabelProps> = ({ error }) => {
  return (
    <p role="input-error" className="mt-2 h-[20px] text-sm text-red-600">
      {error}
    </p>
  )
}

export { ErrorLabel }
