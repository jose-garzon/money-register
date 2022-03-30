import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()
  const goBack = () => router.back()

  return (
    <div className=" -mx-5 flex items-center justify-between rounded-br-[10px] rounded-bl-[10px] px-5 py-3 shadow">
      <FaArrowLeft
        onClick={goBack}
        size={24}
        className="cursor-pointer text-slate-700"
        role="go-back"
      />
      <h6 className="bg-gradient-to-r from-[#F9964F] to-[#F9C74F] bg-clip-text text-2xl font-bold text-transparent">
        Expenses
      </h6>
    </div>
  )
}

export { Header }
