/* eslint-disable react/display-name */
import { FC, forwardRef, InputHTMLAttributes } from 'react'
import styles from './styles.module.css'
interface ExpenseRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  expenseType: 'expense' | 'income'
  checked: boolean
}

const ExpenseRadio: FC<ExpenseRadioProps> = forwardRef<
  HTMLInputElement,
  ExpenseRadioProps
>(({ id, label, expenseType, checked, ...rest }, ref) => {
  const outlineColor = {
    expense: styles.Danger,
    income: styles.Success,
  }
  return (
    <label
      htmlFor={id}
      className={`${styles.Label} ${checked && outlineColor[expenseType]}`}
    >
      <input
        role="radio"
        aria-checked={checked}
        id={id}
        ref={ref}
        className="hidden"
        type="radio"
        {...rest}
      />
      <div className={`${styles.Outline} ${outlineColor[expenseType]}`} />
      <span className={`text-base ${checked && 'font-bold text-white'}`}>
        {label}
      </span>
    </label>
  )
})

export { ExpenseRadio }
