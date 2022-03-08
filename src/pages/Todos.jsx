import { useState, useEffect } from 'react'
import React from 'react'
import Axios from 'axios'

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
    .catch(err => console.error('error: ', err))
  }
  
  
    return (
      //greet user with a custom API here
      <div>
      {/* <button onClick={() => GetTodos()}>todos</button>
      {todos.map(todo => {
        <p>{todo.text}</p>
      })} */}
     {/* <label>Todo:</label>
            <input type="text" onChange={(event) => {
              setTodo(event.target.value)
            }} />
          <button onClick={}>Add to list</button> */}
   
    </div>
  )}



export default Todos

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
    
    // const addToList = () => {
      //   Axios.post("http://localhost:3001/api/todos", {
        //   todo: text

        // async componentDidMount() {
        //   try {
        //     let fetchTodosResponse =  Axios.get('localhost:3001/api/todos') // <-- get data from server (Stream object)
        //     let todos = await fetchTodosResponse.json(); // <------- convert fetch response into a js object
        //     let todoStrings = todos.map(t => t.text)
        //     this.setState({ todoList: todoStrings})
        //     console.log(todos)
        //   } catch (err) {
        //     console.error('ERROR:', err) // <-- log if error
        //   }
        // }
    // })