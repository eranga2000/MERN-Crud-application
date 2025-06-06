import { useState } from 'react'

import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './HomePage.jsx'
import TaskForm from './TaskForm.jsx'
import UpdateOrder from './UpdateOrder.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/create" element={<TaskForm/>}/>
      <Route path="/update" element={<h1>Update</h1>}/>
      <Route path="/update/:id" element={<UpdateOrder/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
