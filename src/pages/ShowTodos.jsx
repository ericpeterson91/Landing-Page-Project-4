import React from 'react';

export default class ShowTodos extends React.Component {
    state = {
      todoHistory: []
    }
  
    async componentDidMount() {
      try {
        let jwt = localStorage.getItem('token')
        let fetchTodosResponse = await fetch('/api/todos', {headers: {'Authorization': 'Bearer ' + jwt}})
        if (!fetchTodosResponse.ok) throw new Error("Couldn't fetch todos")
        let todos = await fetchTodosResponse.json(); // <------- convert fetch response into a js object
  
        // put into sate
        this.setState({ todoHistory: todos})
      } catch (err) {
        console.error('ERROR:', err) // <-- log if error
      }
    }
  
    render() {
      return (
        <main >
          {/* {todoHistory.map(todos =>
            <div>{todos}</div>
            )} */}

            hello
        </main>
      )
    }
  }