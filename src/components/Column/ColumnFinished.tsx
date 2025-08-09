import React, { useState } from 'react'
import styles from './ColumnGlobol.module.css'
import addCard from '../../svg/add-card.svg'
import { Task } from '../../types'

type Props = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  sourceTasks: Task[]
  setSourceTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const ColumnFinished: React.FC<Props> = ({
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
    setTasks([...tasks, moved])
    setSourceTasks(sourceTasks.filter((t) => t.title !== selectedTitle))
    setSelectOpen(false)
  }

  return (
    <div className={styles.column}>
      <h2 className={styles.title}>Finished</h2>

      <div className={styles.card_container}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.card}>
            {task.title}
          </div>
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
        <button
          className={styles.add}
          onClick={() => setSelectOpen(!selectOpen)}
        >
          <img src={addCard} alt="add icon" />
          Add card
        </button>
      )}
    </div>
  )
}

export default ColumnFinished
