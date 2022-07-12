import styles from './styles.module.css'

const SingleLoader = () => {
  return (
    <div className={styles.pulse_loader}>
      <div></div>
      <div></div>
    </div>
  )
}

export { SingleLoader }
