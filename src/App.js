import Header from "./component/Header";
import Tasks from "./component/Tasks";
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NewTask from "./component/NewTask";
import Footer from "./component/Footer";
import About from "./component/About";
import Alert from "./component/Alert";


function App() {

  const [addNewTask, setNewTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [alert, setAlert] = useState(false)


  useEffect(() => {

    const getTasks = async() => {

      const tasksFrombackend = await fetchTasks()
      setTasks(tasksFrombackend)
    }

    getTasks()
  }, [])


const fetchTasks = async() => {
  const req = await fetch('http://localhost:3003/tasks', {method: 'GET'}) //by default GET, no need to use
  const data = await req.json()
  
  return data
}


  const fetchTask = async(id) => {
    const req = await fetch(`http://localhost:3003/tasks/${id}`, {method: 'GET'}) //by default GET, no need to use
    const data = await req.json()
    
    return data
  }

  const reminderTask = async(id) => {

    const reqToggle = await fetchTask(id)
    const updateToggle = {...reqToggle, reminder: !reqToggle.reminder}

    const req = await fetch(`http://localhost:3003/tasks/${id}`,{
      method: 'PUT',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(updateToggle),
    })

    const data = await req.json()

    setTasks(tasks.map((task) => 
      task.id === id ? data : task
    ))
  }

// New Task
  const addTask = async(task) => {

    const req = await fetch(`http://localhost:3003/tasks`,{
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(task) // get data from form stringify it e-g test:test1 => "test":"test1"
    })

    const data = await req.json()
    setTasks([...tasks, data]) //Add this NewTask to the state

  }


// delete task
  const taskDelete = async(id) => {
    await fetch(`http://localhost:3003/tasks/${id}`, { method: 'DELETE'})

    setTasks(tasks.filter((task) => task.id !== id))
    console.log('delete', id)
  }

// alert
  const alertMsg = () => {
      setAlert(true)

      setTimeout(() => {
        const alertM = document.querySelector('.alert')
        alertM.remove()
      },4000)
  }

  return (
    <BrowserRouter>
      <div className="container">
      <Header title="Task Tracker" onAdd={() => setNewTask(!addNewTask)} addNewTask={addNewTask}/>
        <Routes>
          <Route path='/' element={
            <>
              {alert && <Alert />}
              {addNewTask && <NewTask addTask={addTask} alrt={alertMsg}/> }
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={taskDelete} reminder={reminderTask}/> : <p>No Tasks</p>}
            </>
          }/>
          <Route path="/about" element={<About />}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
