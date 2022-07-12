import { HomeHero, ExpenseItem } from '../components/Organisms'
import { MonthPicker, TagPicker, EmptyExpenses } from '../components/Molecules'
import { CreateExpenseButton, ExpensesLoader, Tag } from '../components/Atoms'
import { useHome } from '../hooks/HomePage/logic'
import { currencyFormatter } from '../utils/moneyFormatter'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import tagsService from '../backend/tags'
import expensesService from '../backend/expenses'
import { FC } from 'react'
import { HomeProps } from '../hooks/HomePage/expenses.types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const email = session?.user?.email
  let tags = null
  let expenses = null
  if (email) {
    tags = await tagsService.getTags(email)
    expenses = await expensesService.getExpenses(
      email,
      undefined,
      new Date().toString()
    )
  }
  return { props: { tags, expenses } }
}

const Home: FC<HomeProps> = (props) => {
  const {
    expensesList,
    tagsList,
    selectTag,
    expensesTotal,
    month,
    setMonth,
    loading,
    goToexpenseDetail,
  } = useHome({ tags: props.tags, expenses: props.expenses })

  return (
    <>
      <HomeHero total={currencyFormatter(expensesTotal ?? 0)} />
      <div className="p-6">
        <MonthPicker month={month} setMonth={setMonth} />
        <TagPicker>
          {tagsList?.map(({ name, id, selected }) => (
            <Tag
              onClick={() => selectTag(id)}
              key={id}
              name={name}
              selected={selected}
            />
          ))}
        </TagPicker>
        <div className="mt-6">
          {!expensesList && loading && <ExpensesLoader amount={3} />}
          {expensesList?.map(({ id, amount, date, description, type }) => (
            <ExpenseItem
              onClick={() => goToexpenseDetail(id!)}
              key={id}
              amount={amount}
              date={date}
              description={description}
              type={type}
            />
          ))}
          {expensesList?.length === 0 && <EmptyExpenses />}
        </div>
      </div>
      <CreateExpenseButton />
    </>
  )
}

export default Object.assign(Home, { auth: true })
