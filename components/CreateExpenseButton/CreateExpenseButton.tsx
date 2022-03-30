import { FC } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/router'

const CreateExpenseButton: FC = () => {
  const router = useRouter()
  const goCreateExpenses = () => router.push('/expenses')
  return (
    <button
      onClick={goCreateExpenses}
      aria-label="crea un ingreso o gasto"
      className=" fixed bottom-5 right-5 grid h-[60px] w-[60px] place-content-center rounded-full bg-gradient-to-r from-[#F9964F] to-[#F9C74F] shadow-lg"
    >
      <FaPlus size={30} className="flex-shrink-0 cursor-pointer text-white" />
    </button>
  )
}

export { CreateExpenseButton }
