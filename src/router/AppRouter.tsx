import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import App from '../App'
import TaskPage from '../components/TaskPage/TaskPage'

const AppRouter = () => {
  const [activeCount, setActiveCount] = useState(0)
  const [finishedCount, setFinishedCount] = useState(0)
  const location = useLocation()

  const handleCounts = useCallback((active: number, finished: number) => {
    setActiveCount(active)
    setFinishedCount(finished)
  }, [])

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('backlog') || '[]').length
    const f = JSON.parse(localStorage.getItem('finished') || '[]').length
    setActiveCount(a)
    setFinishedCount(f)
  }, [location])

  useEffect(() => {
    const onUpdate = () => {
      const a = JSON.parse(localStorage.getItem('backlog') || '[]').length
      const f = JSON.parse(localStorage.getItem('finished') || '[]').length
      setActiveCount(a)
      setFinishedCount(f)
    }
    window.addEventListener('tasks-updated', onUpdate)
    return () => window.removeEventListener('tasks-updated', onUpdate)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout activeCount={activeCount} finishedCount={finishedCount}>
            <App onCountsChange={handleCounts} />
          </Layout>
        }
      />
      <Route
        path="/tasks/:id"
        element={
          <Layout activeCount={activeCount} finishedCount={finishedCount}>
            <TaskPage />
          </Layout>
        }
      />
    </Routes>
  )
}

export default AppRouter
