import React, { useState } from 'react'
import styles from './ColumnGlobol.module.css'
import addCard from '../../svg/add-card.svg'
import { Task } from '../../types'
import TaskCard from '../TaskCard/TaskCard'

type Props = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const ColumnBacklog: React.FC<Props> = ({ tasks, setTasks }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newTask, setNewTask] = useState('')

  const handleAddClick = () => setIsAdding(true)

  const handleSubmit = () => {
    if (!newTask.trim()) return
    const newTaskObj: Task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      description: '',
    }
    setTasks((prev) => [...prev, newTaskObj])
    setNewTask('')
    setIsAdding(false)
  }

  return (
    <div className={styles.column}>
      <h2 className={styles.title}>Backlog</h2>

      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} className={styles.card} />
        ))}
      </div>

      {isAdding ? (
        <div>
          <input
            className={styles.input}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div className={styles.butSC}>
            <button className={styles.submit} onClick={handleSubmit}>
              Submit
            </button>
            <button
              className={styles.cancel}
              onClick={() => setIsAdding(false)}
            >
              x
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.add} onClick={handleAddClick}>
          <img src={addCard} alt="card" /> Add card
        </button>
      )}
    </div>
  )
}

export default ColumnBacklog
