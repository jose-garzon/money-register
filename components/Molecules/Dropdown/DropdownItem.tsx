import { FC, MouseEventHandler } from 'react'

interface DropdownItemProps {
  label: string
  onClick?: MouseEventHandler<HTMLLIElement> | undefined
}

const DropdownItem: FC<DropdownItemProps> = ({ label, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer py-2 px-4 text-slate-700 transition duration-300 hover:bg-slate-100"
    >
      {label}
    </li>
  )
}

export { DropdownItem }
