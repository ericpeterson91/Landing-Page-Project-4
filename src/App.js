import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { Component, useState, useEffect } from 'react';
import Axios from "axios"

import Todos from './pages/Todos';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
// import NavbarOut from './components/NavbarOut'
import Quote from './pages/Quote'
import Logout from './pages/Logout'



class App extends React.Component  {
  

  state = {
    user:null,
  }
  
  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  removeUserFromState = () => {
    this.setState({ user: null })
    localStorage.removeItem('token')
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode token
      if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
        localStorage.removeItem('token');
        token = null;
      } else { // token not expired! our user is still 'logged in'. Put them into state.
        let userDoc = payload.user // grab user details from token
        this.setState({user: userDoc})      
      }
    }
  }

  
  

  render(){
  return (
    <div>
      
      
      <Router>
        <Navbar />
        <div>
          {/* { this.state.user ? */}
          <Switch>
            <Route path='/' exact render={(props) => (
                <Todos {...props}/>)}/>
            <Route path='/motivate' exact render={(props) => (
                <Quote {...props}/>)}/>
            <Route path='/logout' render={(props) => (
              <Logout removeUserFromState={this.removeUserFromState} {...props}/>)}/>
          </Switch>
         {/* :  */}
         <Switch>
            <Route path='/signup' render={(props) => (
              <Signup setUserInState={this.setUserInState} {...props}/>)}/>
            <Route path='/login' render={(props) => (
              <Login setUserInState={this.setUserInState} {...props}/>)}/>
          </Switch>
         {/* } */}
        </div>
      </Router>
    </div>
  )

            }
  
  }

export default App;


// const [listOfTodos, setListOfTodos] = useState({
//   input: '',
//   todos: []
// })



// useEffect(() => {
  
//   Axios.get("http://localhost:3001/api/todos").then((response) => {
//     setListOfTodos(response.data);
//   });
// }, []);

// // async componentDidMount() {
// //   try {
// //     let fetchTodosResponse = await fetch('/api/todos') // <-- get data from server (Stream object)
// //      // <------- convert fetch response into a js object
// //     let todosObjects = await fetchTodosResponse.json();
// //     let todosStrings = todosObjects.map(t => t.text)
// //     this.setState({ todos: todosStrings})
// //     console.log(todosStrings)
// //     // console.log(todos)
// //   } catch (err) {
// //     console.error('lol') // <-- log if error
// //   }
// // }

// let handleChange = (event) => {
// setListOfTodos({
//   input: event.target.value
// })
// }

// let addToList = (todo) => {
// setListOfTodos({
//   todos: [...setListOfTodos, todo]
// })
// }




// return (
// <div className="App">
//   <h1>Todo list</h1>
//   <Todo handleChange={handleChange} addToList={addToList}/>
//   {/* <div>
//     {listOfTodos.map((todo)=> {
//     return (
//       <h1>Todo: {todo.text}</h1>

//     )
//   })}
//   </div> */}
// </div>
// );
// }