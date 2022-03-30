import { FC, InputHTMLAttributes, MouseEventHandler } from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'

interface ShowPasswordProps {
  type: InputHTMLAttributes<HTMLInputElement>['type']
  onClick?: MouseEventHandler<SVGElement>
}

const ShowPassword: FC<ShowPasswordProps> = ({ type, onClick }) => {
  if (type === 'password') {
    return (
      <FaEyeSlash
        size={24}
        className="cursor-pointer text-gray-400"
        onClick={onClick}
        role="show-password"
      />
    )
  } else {
    return (
      <FaEye
        size={24}
        className="cursor-pointer text-gray-400"
        onClick={onClick}
        role="hide-password"
      />
    )
  }
}

export { ShowPassword }
