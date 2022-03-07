import { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:3001'

function Todos() {
  
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    GetTodos()
    console.log(todos)
  }, [])
  
  const GetTodos = () => {
    fetch(API_BASE + "/api/todos")
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error: " , err))
  }

  return (
    <div>Todos</div>
  )
}

export default Todos