import './App.css';
import React, { Component } from 'react';


class App extends Component {
  
    state = {
      todos: [],
      users: []
    }

    async componentDidMount() {
      try {
        let fetchTodosResponse = await fetch('/api/todos') // <-- get data from server (Stream object)
         // <------- convert fetch response into a js object
        let todosObjects = await fetchTodosResponse.json();
        let todosStrings = todosObjects.map(t => t.text)
        this.setState({ todos: todosStrings})
        console.log(todosStrings)
        // console.log(todos)
      } catch (err) {
        console.error('lol') // <-- log if error
      }
    }
  

  
  render(){
  return (
    <div className="App">
      
      
      Hello
    </div>
  );
}
}

export default App;
