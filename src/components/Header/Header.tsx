import styles from './Header.module.css'
import Logo from '../Logo/Logo'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.text}>Awesome Kanban Board</h1>
      <Logo />
    </header>
  )
}

export default Header
