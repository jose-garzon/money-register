import { FC, MouseEventHandler } from 'react'

interface TagProps {
  name: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  selected?: boolean
}

const Tag: FC<TagProps> = ({ name, onClick, selected = false }) => {
  return (
    <button
      className={`mr-2 rounded-lg  border border-solid border-transparent px-2 py-1 text-sm ${
        selected ? 'text-white' : 'text-slate-700'
      } ${selected ? 'bg-slate-700' : 'bg-white'} ${
        !selected && 'border-slate-700'
      }`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export { Tag }
