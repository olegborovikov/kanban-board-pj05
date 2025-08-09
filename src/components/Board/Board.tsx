import React, { useEffect, useState } from 'react'
import Backlog from '../Column/ColumnBacklog'
import Ready from '../Column/ColumnReady'
import InProgress from '../Column/ColumnProgress'
import Finished from '../Column/ColumnFinished'
import styles from './Board.module.css'
import { Task } from '../../types'

type BoardProps = {
  onCountsChange: (active: number, finished: number) => void
}

const load = (k: string): Task[] => JSON.parse(localStorage.getItem(k) || '[]')

const Board: React.FC<BoardProps> = ({ onCountsChange }) => {
  const [backlogTasks, setBacklogTasks] = useState<Task[]>(() =>
    load('backlog')
  )
  const [readyTasks, setReadyTasks] = useState<Task[]>(() => load('ready'))
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>(() =>
    load('inProgress')
  )
  const [finishedTasks, setFinishedTasks] = useState<Task[]>(() =>
    load('finished')
  )

  useEffect(
    () => localStorage.setItem('backlog', JSON.stringify(backlogTasks)),
    [backlogTasks]
  )
  useEffect(
    () => localStorage.setItem('ready', JSON.stringify(readyTasks)),
    [readyTasks]
  )
  useEffect(
    () => localStorage.setItem('inProgress', JSON.stringify(inProgressTasks)),
    [inProgressTasks]
  )
  useEffect(
    () => localStorage.setItem('finished', JSON.stringify(finishedTasks)),
    [finishedTasks]
  )

  useEffect(() => {
    onCountsChange(backlogTasks.length, finishedTasks.length)
  }, [backlogTasks.length, finishedTasks.length, onCountsChange])

  return (
    <div className={styles.board}>
      <Backlog tasks={backlogTasks} setTasks={setBacklogTasks} />
      <Ready
        tasks={readyTasks}
        setTasks={setReadyTasks}
        sourceTasks={backlogTasks}
        setSourceTasks={setBacklogTasks}
      />
      <InProgress
        tasks={inProgressTasks}
        setTasks={setInProgressTasks}
        sourceTasks={readyTasks}
        setSourceTasks={setReadyTasks}
      />
      <Finished
        tasks={finishedTasks}
        setTasks={setFinishedTasks}
        sourceTasks={inProgressTasks}
        setSourceTasks={setInProgressTasks}
      />
    </div>
  )
}

export default Board
