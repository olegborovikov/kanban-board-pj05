import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './Layout.module.css'

type LayoutProps = {
  activeCount: number
  finishedCount: number
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({
  activeCount,
  finishedCount,
  children,
}) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer activeCount={activeCount} finishedCount={finishedCount} />
    </div>
  )
}

export default Layout
