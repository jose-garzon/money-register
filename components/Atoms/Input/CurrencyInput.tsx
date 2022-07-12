import { Input, InputProps } from './Input'
import NumberFormat from 'react-number-format'
import { FC, forwardRef } from 'react'

const CurrencyInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <NumberFormat
        getInputRef={ref}
        thousandSeparator
        customInput={Input}
        {...props}
      />
    )
  }
)
CurrencyInput.displayName = 'CurrencyInput'

export { CurrencyInput }
