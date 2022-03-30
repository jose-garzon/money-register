import { FC } from 'react'
import heroStyles from './styles.module.css'

interface HomeHeroProps {
  total: string
}

const HomeHero: FC<HomeHeroProps> = ({ total }) => {
  return (
    <div className={heroStyles.Home__hero}>
      <h1 className={heroStyles.Home__logo}>Expenses</h1>
      <div className={heroStyles.Home__userIndentification}>
        <h3 className="font-bold">Total:</h3>
        <p className="text-3xl font-bold">{total}</p>
      </div>
    </div>
  )
}

export { HomeHero }
