import { useState } from 'react'
import styles from './Logo.module.css'
import userAvatar from '../../svg/user-avatar.svg'
import arrowDown from '../../svg/arrow-down.svg'
import arrowUp from '../../svg/arrow-down-off.svg'

const Logo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.logoWrapper}>
      <div className={styles.logo} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.user}>
          <img src={userAvatar} alt="User avatar" />
        </div>
        <img
          src={isOpen ? arrowUp : arrowDown}
          className={styles.chevron}
          alt="chevron"
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <button type="button">Profile</button>
          <button type="button">Log Out</button>
        </div>
      )}
    </div>
  )
}

export default Logo
