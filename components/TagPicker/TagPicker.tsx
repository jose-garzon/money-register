import { FC } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { useRouter } from 'next/router'

const TagPicker: FC = ({ children }) => {
  const router = useRouter()
  const goTags = () => router.push('/tags')
  return (
    <div className="mt-4 flex items-center overflow-auto">
      <button
        onClick={goTags}
        aria-label="crea una etiqueta"
        className="flex-shrink-0"
      >
        <FaPlusCircle className="mr-4 text-slate-700" size={30} />
      </button>
      {children}
    </div>
  )
}

export { TagPicker }
