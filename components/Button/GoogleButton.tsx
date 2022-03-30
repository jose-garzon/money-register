import { FC, MouseEventHandler } from 'react'
import { FaGoogle } from 'react-icons/fa'

interface GoogleButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}

const GoogleButton: FC<GoogleButtonProps> = ({ onClick }) => {
  return (
    <button
      title="login con google"
      aria-label="login con google"
      className="mx-auto flex items-center rounded-full p-2 px-6 text-slate-700 hover:bg-slate-100"
      type="button"
      onClick={onClick}
    >
      <FaGoogle className="mr-4" />
      <span className="text-sm">Login with Google</span>
    </button>
  )
}
export { GoogleButton }
