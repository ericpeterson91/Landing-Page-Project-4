import { useState, useEffect } from 'react'
import React from 'react'
import Axios from 'axios'
import "./css/Todos.css"


class Todos extends React.Component {

  state = {
    todos: []
  }

  addTodo = async () => {
    try {
      let jwt = localStorage.getItem('token')
      let fetchResponse = await fetch("/api/todos", {
        method: "POST",
        headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({todos: this.state.todos}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse)   // <-- log server response

      this.setState({todos: []}) // if order sent without errors, set state to empty
    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }
  }
  
 
  
    render(){

     
    
    return (
      <div className="todo-container">
      <section>
        <h1>Add to do</h1>
        {/* <p>Log back in to use your To Do list</p> */}

     </section>
      <form onSubmit={this.addTodo}>
        <input type="text"></input>
        <button className="btn-todo" type="submit">Add</button>
      </form>
      </div>
  )}
    }



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