import { FaCalendarAlt, FaDollarSign, FaListAlt, FaTags } from 'react-icons/fa'
import {
  LoadingButton,
  OverlayLoader,
  DatePicker,
  ErrorLabel,
  Input,
  CurrencyInput,
} from '../../components/Atoms'
import { Header } from '../../components/Organisms'
import { ExpenseRadio, Dropdown } from '../../components/Molecules'
import { useExpenses } from '../../hooks/ExpensesPage/logic'
import { FaTrash } from 'react-icons/fa'

const Expenses = () => {
  const {
    createExpense,
    editing,
    errors,
    handleDeleteExpense,
    register,
    tags,
    watch,
    control,
    isLoading,
    isMainLoading,
    isDeleteLoading,
  } = useExpenses()

  if (isLoading) return <OverlayLoader />

  return (
    <form
      className="flex flex-col justify-between px-5 pb-10"
      onSubmit={createExpense}
    >
      <div>
        <Header />
        <div className="mb-8">
          <h1 className="mb-2 mt-10 font-bold">
            {editing ? 'Editar registro' : 'Nuevo registro'}
          </h1>
          {!editing && <p>Crea un ingreso o gasto</p>}
        </div>
      </div>
      <div>
        <div>
          <Input
            label="Descripción"
            id="description"
            placeholder="Descripción"
            startIcon={FaListAlt}
            {...register('description')}
            errors={errors}
          />
          <CurrencyInput
            label="Monto"
            startIcon={FaDollarSign}
            placeholder="Monto"
            {...register('amount')}
            errors={errors}
          />
          <DatePicker
            label="Fecha"
            placeholder="Fecha"
            name="date"
            control={control}
            startIcon={FaCalendarAlt}
            errors={errors}
          />
        </div>
        <div className="mb-2 flex justify-between gap-4">
          <ExpenseRadio
            expenseType="income"
            label="Ingreso"
            id="income"
            value="income"
            checked={watch('type') === 'income'}
            {...register('type')}
          />
          <ExpenseRadio
            checked={watch('type') === 'expense'}
            expenseType="expense"
            label="Gasto"
            id="expense"
            value="expense"
            {...register('type')}
          />
        </div>
        <ErrorLabel error={errors?.['type']?.message} />
        {watch('type') === 'expense' && (
          <Dropdown
            label="Tag"
            placeholder="Etiqueta"
            name="tag"
            startIcon={FaTags}
            errors={errors}
            control={control}
            options={tags}
          />
        )}
      </div>
      <div>
        <LoadingButton isLoading={isMainLoading} className="mb-2">
          {editing ? 'Editar' : 'Crear'}
        </LoadingButton>
        {editing && (
          <LoadingButton
            isLoading={isDeleteLoading}
            variant="outline"
            className="mb-2"
            startIcon={FaTrash}
            onClick={handleDeleteExpense}
          >
            Eliminar
          </LoadingButton>
        )}
      </div>
    </form>
  )
}

Expenses.auth = true
export default Expenses
