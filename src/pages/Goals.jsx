import { useState, useEffect } from 'react'
import React from 'react'
import Axios from 'axios'
import "./css/Todos.css"



class Goals extends React.Component {

  state = {
    goals: [],
    text: ''
  }

  //  'Authorization' 'Bearer ' + jwt

  addGoal = async (e) => {
    e.preventDefault()
    try {
      let jwt = localStorage.getItem('token')
      let fetchResponse = await fetch("/api/goals", {
        method: "POST",
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
        body: JSON.stringify({text: this.state.text}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse)   // <-- log server response

      //need to somehow use the json web token here again
      let fetchGoalsResponse = await fetch('api/goals', {
        method: "GET",
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
      })
      let goalList = await fetchGoalsResponse.json()
      console.log(goalList)
      console.log(serverResponse)
      
      this.setState({goals: goalList, text: ''}) // if order sent without errors, set state to empty
    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }
  }
  
 async componentDidMount() {
   try {
    let jwt = localStorage.getItem('token')
    let fetchGoalsResponse = await fetch('api/goals', {
      method: "GET",
      headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
    })
    let goalList = await fetchGoalsResponse.json()
 
    this.setState({
      goals: goalList
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
  let fetchResponse = await fetch(`api/goals/${id}/${this.props.user._id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
        body: JSON.stringify({text: this.state.text}) // <-- send this object to server
        }) 

   let fetchGoalsResponse = await fetch('api/goals', {
          method: "GET",
          headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
        })
  let goalList = await fetchGoalsResponse.json()
  this.setState({
    goals: goalList
  })

  console.log(id)
 }
  
    render(){

    return (
      <div>
    
      <div className="todo-container">
      <section>
        <h1 className="title">Add a goal</h1>
        {/* <p>Log back in to use your To Do list</p> */}

     </section>
      <form onSubmit={this.addGoal}>
        <input  value={this.state.text} onChange={this.handleChange} type="text"></input>
        <button className="btn-todo" type="submit">Add</button>
      </form>
      
      
          <h2 className="todo-title">{(this.props.user.name).charAt(0).toUpperCase() + (this.props.user.name).slice(1)}'s Goal list</h2>
        <div className="todos">
        { (this.state.goals.length > 0) 
        ? this.state.goals.map(t => ( 
          <div key={t.text}>
            <div className="todo-item">
              <h4 className="todo-name">{t.text}</h4>
            </div>
            <div>
              <button className="todo-btn" onClick={() => { this.deleteOne(t._id)}}>Delete</button>
            </div>
          </div> 
          ))
          :
          <h1>No goals</h1>
        }
        </div>
        </div>
    </div>
  )}
    }



export default Goals