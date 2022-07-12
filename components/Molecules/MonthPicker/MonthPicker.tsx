import { format } from 'date-fns'
import add from 'date-fns/add'
import sub from 'date-fns/sub'
import { es } from 'date-fns/locale'
import { Dispatch, FC, SetStateAction } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

interface MonthPickerProps {
  month: Date
  setMonth: Dispatch<SetStateAction<Date>>
}

const MonthPicker: FC<MonthPickerProps> = ({ month, setMonth }) => {
  const onNext = () => setMonth(add(month, { months: 1 }))
  const onPrevious = () => setMonth(sub(month, { months: 1 }))

  return (
    <div className="flex items-end justify-between">
      <FaAngleLeft
        size={30}
        className="cursor-pointer text-slate-700"
        onClick={onPrevious}
      />
      <p className="capitalize">{format(month, 'LLLL yyyy', { locale: es })}</p>
      <FaAngleRight
        size={30}
        className="cursor-pointer text-slate-700"
        onClick={onNext}
      />
    </div>
  )
}

export { MonthPicker }
