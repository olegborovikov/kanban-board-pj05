import { Task } from '../../types'

type Props = { task: Task; className?: string }

const TaskCard: React.FC<Props> = ({ task, className }) => {
  const openInNewWindow = () => {
    const base = process.env.PUBLIC_URL || ''
    const url = `${base}/tasks/${task.id}`
    const w = window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={className}
      onClick={openInNewWindow}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        (e.key === 'Enter' || e.key === ' ') && openInNewWindow()
      }
    >
      {task.title}
    </div>
  )
}

export default TaskCard
