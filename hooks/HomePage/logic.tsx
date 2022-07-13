import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getExpenses, getTotal } from '../../apiRequests/expenses'
import { getTags } from '../../apiRequests/tags'
import type { Tag } from '../TagsPage/tags.types'
import { Expense } from './expenses.types'

const useHome = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const email = session?.user?.email!
  const [month, setMonth] = useState<Date>(() => new Date())
  const [tagsFilter, setTagsFilter] = useState<Tag[]>([])
  const tags = useQuery<Tag[]>(['getTags'], () => getTags(email!), {
    useErrorBoundary: true,
  })
  const totalMoney = useQuery(['getTotal'], () => getTotal(email!), {
    useErrorBoundary: true,
  })
  const expenses = useQuery<Expense[]>(
    ['getExpenses', tagsFilter, month],
    () =>
      getExpenses({
        email,
        date: month,
        tags: tagsFilter
          .filter((tag) => tag.selected)
          .map((selected) => selected.id),
      }),
    {
      enabled: tagsFilter.length > 0,
      useErrorBoundary: true,
    }
  )

  const goToexpenseDetail = (id: string) => router.push(`/expenses/${id}`)

  const logout = () => signOut()

  const selectTag = (id: string) => {
    const selectedList = tagsFilter.map((tag) => {
      if (tag.id === id) return { ...tag, selected: !tag.selected }
      return tag
    })
    setTagsFilter(selectedList)
  }

  useEffect(() => {
    if (tags?.isSuccess)
      setTagsFilter(tags.data.map((tag) => ({ ...tag, selected: false })))
  }, [tags?.data, tags.isSuccess])

  return {
    expensesList: expenses?.data,
    expensesTotal: totalMoney.data?.data,
    loading: expenses.isLoading || tags.isLoading,
    logout,
    selectTag,
    tagsList: tagsFilter,
    month,
    setMonth,
    goToexpenseDetail,
  }
}

export { useHome }
