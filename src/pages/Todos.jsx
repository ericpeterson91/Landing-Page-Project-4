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
    console.log('function activated')
    fetch(API_BASE + "/api/todos")
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error: " , err))
  }

  return (
    //greet user with a custom API here
    <div>
      {/* <button onClick={() => GetTodos()}>todos</button>
      {todos.map(todo => {
      <p>{todo.text}</p>
    })} */}
    </div>
  )
}

export default Todos