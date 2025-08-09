import React, { useState } from 'react'
import styles from './ColumnGlobol.module.css'
import addCard from '../../svg/add-card.svg'
import { Task } from '../../types'
import TaskCard from '../TaskCard/TaskCard'

type Props = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  sourceTasks: Task[]
  setSourceTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const ColumnProgress: React.FC<Props> = ({
  tasks,
  setTasks,
  sourceTasks,
  setSourceTasks,
}) => {
  const [selectOpen, setSelectOpen] = useState(false)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = e.target.value
    if (!selectedTitle) return
    const moved = sourceTasks.find((t) => t.title === selectedTitle)
    if (!moved) return
    setTasks((prev) => [...prev, moved])
    setSourceTasks((prev) => prev.filter((t) => t.title !== selectedTitle))
    setSelectOpen(false)
  }

  return (
    <div className={styles.column}>
      <h2 className={styles.title}>In Progress</h2>

      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} className={styles.card} />
        ))}

        {selectOpen && sourceTasks.length > 0 && (
          <select
            className={styles.input}
            onChange={handleSelect}
            defaultValue=""
          >
            <option disabled value="">
              Выберите задачу
            </option>
            {sourceTasks.map((task) => (
              <option key={task.id} value={task.title}>
                {task.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {sourceTasks.length > 0 && (
        <button className={styles.add} onClick={() => setSelectOpen((o) => !o)}>
          <img src={addCard} alt="add icon" />
          Add card
        </button>
      )}
    </div>
  )
}

export default ColumnProgress
