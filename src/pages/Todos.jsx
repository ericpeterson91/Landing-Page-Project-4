import { useState, useEffect } from 'react'
import React from 'react'
import Axios from 'axios'
import "./css/Todos.css"



class Todos extends React.Component {

  state = {
    todos: [],
    text: ''
  }

  //  'Authorization' 'Bearer ' + jwt

  addTodo = async (e) => {
    e.preventDefault()
    try {
      let jwt = localStorage.getItem('token')
      let fetchResponse = await fetch("/api/todos", {
        method: "POST",
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
        body: JSON.stringify({text: this.state.text}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse)   // <-- log server response

      //need to somehow use the json web token here again
      let fetchTodosResponse = await fetch('api/todos', {
        method: "GET",
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
      })
      let todoList = await fetchTodosResponse.json()
      console.log(todoList)
      console.log(serverResponse)
      
      this.setState({todos: todoList, text: ''}) // if order sent without errors, set state to empty
    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }
  }
  
 async componentDidMount() {
   try {
    let jwt = localStorage.getItem('token')
    let fetchTodosResponse = await fetch('api/todos', {
      method: "GET",
      headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
    })
    let todoList = await fetchTodosResponse.json()
 
    this.setState({
      todos: todoList
    })
    // console.log('hi')
   } catch (err) {
     console.error('error' + err)
   }
 } 

 componentDidUpdate(prevProps, prevState) {
  if (prevState.todos !== this.state.todos) {
   this.setState({
     todos: this.state.todos
   })
    console.log('hi')
  }
}
//   try {
//    let jwt = localStorage.getItem('token')
//    let fetchTodosResponse = await fetch('api/todos', {
//      method: "GET",
//      headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
//    })
//    let todoList = await fetchTodosResponse.json()

//    this.setState({
//      todos: todoList
//    })
//   } catch (err) {
//     console.error('error' + err)
//   }
// }

 handleChange = (e) => {
   this.setState({
     text: e.target.value,
     error: ""
   })
 }

  deleteOne = async (id) => {
    console.log(this.props.user._id)
  let jwt = localStorage.getItem('token')
  let fetchResponse = await fetch(`api/todos/${id}/${this.props.user._id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
        body: JSON.stringify({text: this.state.text}) // <-- send this object to server
        }) 

   let fetchTodosResponse = await fetch('api/todos', {
          method: "GET",
          headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
        })
  let todoList = await fetchTodosResponse.json()
  this.setState({
    todos: todoList
  })

  console.log(id)
 }
  
    render(){

    return (
      <div>
        <div>
        { (this.state.todos.length > 0) 
        ? this.state.todos.map(t => ( 
          <div key={t.text}>
            <div>{t.text}</div>
            <button onClick={() => { this.deleteOne(t._id)}}>Delete</button>
            
          </div> 
          ))
          :
          <h1>No todos</h1>
        }</div>
        <div>
        {/* { (this.state.todos.length > 0) ? */}
       
        {/* {this.state.todos.map(t => ( 
          <div key={t.text}>
            <div>{t.text}</div>
          </div> */}
          {/* ))} */}
          
         
          </div>
    
      <div className="todo-container">
      <section>
        <h1>Add to do</h1>
        {/* <p>Log back in to use your To Do list</p> */}

     </section>
      <form onSubmit={this.addTodo}>
        <input  value={this.state.text} onChange={this.handleChange} type="text"></input>
        <button className="btn-todo" type="submit">Add</button>
      </form>
      </div>
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