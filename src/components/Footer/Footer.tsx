import styles from './Footer.module.css'

type Props = {
  activeCount: number
  finishedCount: number
}

const Footer: React.FC<Props> = ({ activeCount, finishedCount }) => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.rowLeft}>
        <span className={styles.text}>Active tasks: {activeCount}</span>
        <span className={styles.text}>Finished tasks: {finishedCount}</span>
      </div>
      <div className={styles.rowRight}>
        <span className={styles.text}>Kanban board by Oleg, {currentYear}</span>
      </div>
    </footer>
  )
}

export default Footer
