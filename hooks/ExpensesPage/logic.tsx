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
  const email = session?.user?.email
  const expenseId = router?.query?.id?.[0]!
  const typeInForm = watch('type')
  const goHome = () => router.push('/')

  const tags = useQuery(['getTags'], () => getTags(email!))
  const expenseDetail = useQuery(
    ['getExpenseDetail'],
    () => getExpenseDetail(expenseId),
    { enabled: !!expenseId }
  )
  const createExpenseMutation = useMutation(postExpense, {
    onSuccess: goHome,
    useErrorBoundary: true,
  })
  const editExpenseMutation = useMutation(putExpense, {
    onSuccess: goHome,
    useErrorBoundary: true,
  })
  const deleteExpenseMutation = useMutation(deleteExpense, {
    onSuccess: goHome,
    useErrorBoundary: true,
  })

  const createExpense = handleSubmit((expenseForm) => {
    const createReq = {
      ...expenseForm,
      email: email!,
    }
    console.log(createReq)
    // if (!expenseId) return createExpenseMutation.mutate(createReq)
    // const editReq = { ...expenseForm, id: expenseId }
    // return editExpenseMutation.mutate(editReq)
  })

  const handleDeleteExpense = () => {
    if (expenseDetail?.data?.id)
      return deleteExpenseMutation.mutate(expenseDetail?.data?.id)
  }

  useEffect(() => {
    if (typeInForm === 'income') setValue('tag', '')
  }, [typeInForm, setValue])

  useEffect(() => {
    if (expenseDetail.isSuccess && expenseId) {
      const expense = {
        ...expenseDetail.data,
        date: new Date(expenseDetail.data.date),
      }
      delete expense.id
      reset(expense)
    }
    return () => reset(defaultValues)
  }, [expenseDetail.isSuccess, reset, expenseDetail.data, expenseId])

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
