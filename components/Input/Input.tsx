import {
  FC,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from 'react'
import { ShowPassword } from './ShowPassword'
import { FormErrors } from '../../hooks/useCustomForm'
import { ErrorLabel } from '.'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  startIcon?: FC<{ className: string; size: number }>
  errors?: FormErrors
  id?: InputHTMLAttributes<HTMLInputElement>['id']
  className?: InputHTMLAttributes<HTMLInputElement>['className']
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  name?: InputHTMLAttributes<HTMLInputElement>['name']
  avoidTyping?: boolean
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      className,
      type = 'text',
      startIcon: StartIcon,
      errors,
      name = '',
      avoidTyping = false,
      ...rest
    },
    ref
  ) => {
    const [inputType, setInputType] = useState<string>(type)
    const showPassword = () => {
      setInputType(inputType === 'password' ? 'text' : 'password')
    }

    const typing = (event: KeyboardEvent<HTMLInputElement>) => {
      if (type === 'number' && /[e-\D]/g.test(event.key)) {
        event.preventDefault()
      }
      if (
        type === 'text' &&
        /[!"#$%&'()*+,-./:;<=>?@[\]\\^_`{|}~\d]/g.test(event.key)
      ) {
        event.preventDefault()
      }
    }

    return (
      <div className={`${className} mb-3`}>
        <label
          htmlFor={id}
          className={`${
            errors?.[name] ? 'border-red-500' : 'border-slate-200'
          } text-md relative flex items-center rounded-3xl border-2 border-solid  border-transparent p-3 px-6  shadow-md transition duration-500 ease-out focus-within:border-yellow-300 focus-within:shadow-lg`}
        >
          <span className="text-md absolute top-0 left-4 -translate-y-1/2 bg-white  px-2 text-slate-500">
            {label}
          </span>
          {StartIcon && (
            <StartIcon
              size={20}
              className={`mr-4  ${
                errors?.[name] ? 'text-red-500' : 'text-gray-400'
              }`}
            />
          )}
          <input
            id={id}
            name={name}
            className="w-full focus:outline-none"
            type={inputType}
            ref={ref}
            onKeyPress={avoidTyping ? typing : undefined}
            onKeyDown={avoidTyping ? typing : undefined}
            {...rest}
          />
          {type === 'password' && (
            <ShowPassword onClick={showPassword} type={inputType} />
          )}
        </label>
        <ErrorLabel error={errors?.[name]?.message} />
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }
