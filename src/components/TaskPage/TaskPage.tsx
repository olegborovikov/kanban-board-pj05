import React, { useEffect, useState } from 'react'
import styles from './TaskPage.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { Task } from '../../types'

const KEYS = ['backlog', 'ready', 'inProgress', 'finished']

const TaskPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
  const [text, setText] = useState('')

  useEffect(() => {
    if (!id) return
    const all: Task[] = KEYS.map((k) =>
      JSON.parse(localStorage.getItem(k) || '[]')
    ).flat()
    const found = all.find((t) => String(t.id) === String(id))
    if (found) {
      setTask(found)
      setText(found.description || '')
    }
  }, [id])

  const handleSave = () => {
    if (!task) return
    for (const key of KEYS) {
      const raw = localStorage.getItem(key)
      if (!raw) continue
      const items: Task[] = JSON.parse(raw)
      const idx = items.findIndex((t) => String(t.id) === String(task.id))
      if (idx !== -1) {
        items[idx].description = text
        localStorage.setItem(key, JSON.stringify(items))
        break
      }
    }
    window.dispatchEvent(new Event('tasks-updated'))
    navigate('/') // ← возвращаем на главную страницу
  }

  const handleClose = () => {
    if (window.opener) {
      window.close()
      return
    }
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  if (!task) return <div className={styles.taskPage}>Задача не найдена</div>

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button type="button" className={styles.close} onClick={handleClose}>
          ✖
        </button>
        <h2 className={styles.title}>{task.title}</h2>
        <textarea
          className={styles.textarea}
          value={text}
          placeholder="This task has no description"
          onChange={(e) => setText(e.target.value)}
        />
        <div className={styles.actions}>
          <button type="button" className={styles.save} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskPage
