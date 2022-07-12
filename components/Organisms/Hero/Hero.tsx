import heroStyles from './styles.module.css'

const Hero = () => {
  return (
    <div className={heroStyles.Hero} title="expenses logo">
      <p className={heroStyles.Hero__title}>
        Expenses
        <span className={heroStyles.Hero__logo} />
      </p>
    </div>
  )
}

export { Hero }
