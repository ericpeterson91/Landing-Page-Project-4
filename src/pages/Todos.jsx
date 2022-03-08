import { useState, useEffect } from 'react'

import Axios from 'axios'

const API_BASE = 'http://localhost:3001'

function Todos(props) {

  const [todo, setTodo] = useState('')

  // Axios.post("http://localhost:3001/api/todos"){

  // }
  
  
  return (
    //greet user with a custom API here
    <div>
      {/* <button onClick={() => GetTodos()}>todos</button>
      {todos.map(todo => {
        <p>{todo.text}</p>
      })} */}
     <label>Todo:</label>
            <input type="text" onChange={(event) => {
              setTodo(event.target.value)
            }} />
            <button onClick={props.addToList}>Add to list</button>
   
    </div>
  )
}

// const [todos, setTodos] = useState([])
// const [newTodo, setNewTodo] = useState("")

// useEffect(() => {
//   GetTodos()
//   console.log(todos)
// }, [])



// const GetTodos = () => {
//   console.log('function activated')
//   fetch(API_BASE + "/api/todos")
//   .then(res => res.json())
//   .then(data => setTodos(data))
//   .catch(err => console.error("Error: " , err))
// }
export default Todos