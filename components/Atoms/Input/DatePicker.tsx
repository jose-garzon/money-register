import { es } from 'date-fns/locale'
import { Control, Controller, Path } from 'react-hook-form'
import { DatePicker as Picker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { Input } from '.'
import { InputProps } from './Input'

interface DatePickerProps<T> extends InputProps {
  control?: Control<T>
  name: Path<T>
}

const DatePicker = <T,>({
  name,
  control,
  label,
  ...rest
}: DatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Picker
          locale={es}
          date={(value as Date) ?? new Date()}
          onDateChange={onChange}
        >
          {({ inputProps }) => (
            <Input
              label={label}
              name={name}
              {...rest}
              {...inputProps}
              autoComplete="off"
            />
          )}
        </Picker>
      )}
    />
  )
}

export { DatePicker }
