import { useRouter } from 'next/router'
import { FaClipboardList } from 'react-icons/fa'
import { Button } from '../../Atoms'

const EmptyExpenses = () => {
  const router = useRouter()
  const goCreateExpense = () => router.push('/expenses')

  return (
    <div className="mt-10 text-center">
      <FaClipboardList className="mx-auto flex-shrink-0 text-6xl text-slate-700" />
      <h2 className="mt-6 font-bold">Aún no tienes registros</h2>
      <Button variant="outline" className="mt-4" onClick={goCreateExpense}>
        Comienza a crearlos
      </Button>
    </div>
  )
}

export { EmptyExpenses }
