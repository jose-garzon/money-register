import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  deleteExpense,
  getExpenseDetail,
  postExpense,
  putExpense,
} from '../../apiRequests/expenses'
import { getTags } from '../../apiRequests/tags'
import { Expense } from '../HomePage/expenses.types'
import { useCustomForm } from '../useCustomForm'
import { ExpenseSchema } from './schema'

const defaultValues = {
  description: '',
  tag: '',
  date: new Date(),
}

const useExpenses = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useCustomForm<Expense>({
    schema: ExpenseSchema,
    defaultValues,
  })
  const router = useRouter()
  const { data: session } = useSession()
  const email = session?.user?.email ?? ''
  const expenseId = router?.query?.id?.[0] ?? ''
  const typeInForm = watch('type')
  const goHome = () => {
    reset(defaultValues)
    router.push('/')
  }

  const mutationConfig = {
    onSuccess: goHome,
    useErrorBoundary: true,
  }

  const tags = useQuery(['getTags'], () => getTags(email))
  const expenseDetail = useQuery(
    ['getExpenseDetail'],
    () => getExpenseDetail(expenseId),
    {
      enabled: !!expenseId,
      onSuccess: (data) => {
        delete data.id
        reset({ ...data, date: new Date(data.date) })
      },
    }
  )
  const createExpenseMutation = useMutation(postExpense, mutationConfig)
  const editExpenseMutation = useMutation(putExpense, mutationConfig)
  const deleteExpenseMutation = useMutation(deleteExpense, mutationConfig)

  const createExpense = handleSubmit((expenseForm) => {
    const createReq = {
      ...expenseForm,
      email: email,
    }
    if (!expenseId) return createExpenseMutation.mutate(createReq)
    const editReq = { ...expenseForm, id: expenseId }
    return editExpenseMutation.mutate(editReq)
  })

  const handleDeleteExpense = () => {
    if (expenseDetail?.data?.id) {
      return deleteExpenseMutation.mutate(expenseDetail?.data?.id)
    }
  }

  useEffect(() => {
    if (typeInForm === 'income') setValue('tag', '')
  }, [typeInForm, setValue])

  return {
    createExpense,
    editing: !!expenseId,
    errors,
    handleDeleteExpense,
    register,
    tags: tags?.data?.map(({ name, id }) => ({ label: name, value: id })),
    watch,
    control,
    isLoading: expenseDetail.isLoading,
    isMainLoading:
      createExpenseMutation.isLoading || editExpenseMutation.isLoading,
    isDeleteLoading: deleteExpenseMutation.isLoading,
  }
}

export { useExpenses }
