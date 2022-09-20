import { FaTimes } from 'react-icons/fa'

const Task = ({task, onDeleteTask, reminderTasks}) => {

  return (
    <div 
      className={`task ${task.reminder ? 'reminder':''}`} 
      onDoubleClick={() => reminderTasks(task.id)}
    >
        <h3 >{task.text}
            <FaTimes style={{color:"red", cursor:"pointer"}} onClick={() => onDeleteTask(task.id)}
            />
        </h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task