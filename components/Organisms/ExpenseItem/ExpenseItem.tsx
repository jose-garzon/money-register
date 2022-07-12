import { format } from 'date-fns'
import es from 'date-fns/locale/es'
import { FC, MouseEventHandler } from 'react'
import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa'
import { currencyFormatter } from '../../../utils/moneyFormatter'

interface ExpenseItemProps {
  amount: number
  date: Date
  description: string
  type: 'expense' | 'income'
  onClick?: MouseEventHandler<HTMLDivElement>
}

const ExpenseItem: FC<ExpenseItemProps> = ({
  amount,
  date,
  description,
  type,
  onClick,
}) => {
  return (
    <div
      className="mb-2 flex cursor-pointer items-center justify-between border-b border-solid border-slate-300 py-1 last-of-type:mb-16"
      onClick={onClick}
    >
      <div>
        <p>{description}</p>
        <span className=" capitalize text-slate-400">
          {format(new Date(date), 'cccc dd', { locale: es })}
        </span>
      </div>
      <div className="flex">
        {type === 'income' && (
          <FaAngleDoubleUp size={25} className="text-emerald-500" />
        )}
        {type === 'expense' && (
          <FaAngleDoubleDown size={25} className="text-red-500" />
        )}
        <p
          className={`font-bold ${
            type === 'income' ? 'text-emerald-500' : 'text-red-500'
          }`}
        >
          {currencyFormatter(amount ?? 0)}
        </p>
      </div>
    </div>
  )
}

export { ExpenseItem }
