import { useState } from 'react'


const NewTask = ( { addTask , alrt} ) => {
  
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

//form submitt
  const onSubmit = (e) => {
    e.preventDefault()

    if (!text || !day) {
      alrt(text)
      return
    }
    addTask( {text, day, reminder} )

    // reset after submit
    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>New Task</label>
            <input type='text' placeholder='NewTask'
              value={text} onChange={(e) => setText(e.target.value)}/> 
        </div>

        <div className="form-control">
            <label>Day</label>
            <input type='text' placeholder='Day'
              value={day} onChange={(e) => setDay(e.target.value)}/>
        </div>

        <div className="form-control form-control-check">
            <label>Reminder</label>
            <input type='checkbox' checked={reminder}
              value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>

        <input type='submit' style={{color:'white', background:'green'}} className="btn btn-block" value="Add this task?" />
    </form>
  )
}

export default NewTask