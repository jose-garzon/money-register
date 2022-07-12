import { useEffect, useRef, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Input } from '../../Atoms'
import { InputProps } from '../../Atoms/Input'
import { DropdownItem } from './DropdownItem'

interface OptionProps {
  label: string
  value: string
}

interface DropdownProps<T> extends InputProps {
  label: string
  control?: Control<T>
  options?: OptionProps[]
  name: Path<T>
}

const Dropdown = <T extends FieldValues>({
  options,
  label,
  name,
  control,
  ...rest
}: DropdownProps<T>) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const showList = () => setShowOptions(true)
  const hideList = () => setShowOptions(false)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      if (!container?.current?.contains(event.target as Node)) hideList()
    })
  }, [container])

  return (
    <div ref={container}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <div className="relative">
            <Input
              label={label}
              onFocus={showList}
              name={name}
              value={options?.find((opt) => opt.value === value)?.label}
              readOnly
              {...rest}
            />
            <ul
              className={`${
                showOptions ? 'opacity-100' : 'pointer-events-none opacity-0'
              }  absolute bottom-[110%] z-10 w-full overflow-hidden rounded-xl border-2 border-slate-200 bg-white transition duration-300`}
            >
              {options?.map(({ label, value }) => (
                <DropdownItem
                  onClick={() => {
                    onChange(value)
                    hideList()
                  }}
                  key={`dropdown_item_${value}`}
                  label={label}
                />
              ))}
            </ul>
          </div>
        )}
      />
    </div>
  )
}

export { Dropdown }
