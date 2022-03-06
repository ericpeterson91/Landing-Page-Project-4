import './App.css';
import React, { Component, useState, useEffect } from 'react';
import Axios from "axios"
import Todo from "./components/Todo"


function App() {



    const [listOfTodos, setListOfTodos] = useState({
      input: '',
      todos: []
    })

    
    
    useEffect(() => {
      
      Axios.get("http://localhost:3001/api/todos").then((response) => {
        setListOfTodos(response.data);
      });
  }, []);

    // async componentDidMount() {
    //   try {
    //     let fetchTodosResponse = await fetch('/api/todos') // <-- get data from server (Stream object)
    //      // <------- convert fetch response into a js object
    //     let todosObjects = await fetchTodosResponse.json();
    //     let todosStrings = todosObjects.map(t => t.text)
    //     this.setState({ todos: todosStrings})
    //     console.log(todosStrings)
    //     // console.log(todos)
    //   } catch (err) {
    //     console.error('lol') // <-- log if error
    //   }
    // }
  
 let handleChange = (event) => {
    setListOfTodos({
      input: event.target.value
    })
  }

  let addToList = (todo) => {
    setListOfTodos({
      todos: [...setListOfTodos, todo]
    })
  }


  

  return (
    <div className="App">
      <h1>Todo list</h1>
      <Todo handleChange={handleChange} addToList={addToList}/>
      {/* <div>
        {listOfTodos.map((todo)=> {
        return (
          <h1>Todo: {todo.text}</h1>

        )
      })}
      </div> */}
    </div>
  );
}


export default App;
