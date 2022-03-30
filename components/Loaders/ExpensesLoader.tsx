import { FC } from 'react'
import styles from './styles.module.css'

interface ExpensesLoaderProps {
  amount: number
}

const ExpensesLoader: FC<ExpensesLoaderProps> = ({ amount }) => {
  if (amount < 0) return null
  return (
    <>
      {Array(amount)
        .fill(0)
        .map((_, index) => (
          <div
            role="loader"
            key={`loader-${index}`}
            className="flex h-[60px] items-center justify-between border-b border-solid border-slate-300"
          >
            <div className="h-full w-1/2 p-2">
              <div
                className={`${styles.skeletonBox} h-[18px] w-full rounded-sm`}
              ></div>
              <div
                className={`${styles.skeletonBox} h-[12px] w-1/2 rounded-sm`}
              ></div>
            </div>
            <div
              className={`${styles.skeletonBox} h-[20px] w-1/3 rounded-sm`}
            ></div>
          </div>
        ))}
    </>
  )
}

export { ExpensesLoader }
