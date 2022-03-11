import React from "react";
import "./css/Todos.css";

class Todos extends React.Component {
  state = {
    todos: [],
    text: "",
  };


  addTodo = async (e) => {
    e.preventDefault();
    try {
      let jwt = localStorage.getItem("token");
      let fetchResponse = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ text: this.state.text }), 
      });
      let serverResponse = await fetchResponse.json(); 
      console.log("Success:", serverResponse); 

      let fetchTodosResponse = await fetch("api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      let todoList = await fetchTodosResponse.json();
      console.log(todoList);
      console.log(serverResponse);

      this.setState({ todos: todoList, text: "" }); 
    } catch (err) {
      console.error("Error:", err);
    }
  };

  async componentDidMount() {
    try {
      let jwt = localStorage.getItem("token");
      let fetchTodosResponse = await fetch("api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      let todoList = await fetchTodosResponse.json();

      this.setState({
        todos: todoList,
      });
  
    } catch (err) {
      console.error("error" + err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      this.setState({
        todos: this.state.todos,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
      error: "",
    });
  };

  deleteOne = async (id) => {
    console.log(this.props.user._id);
    let jwt = localStorage.getItem("token");
    let fetchResponse = await fetch(`api/todos/${id}/${this.props.user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ text: this.state.text }), 
    });

    let fetchTodosResponse = await fetch("api/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    let todoList = await fetchTodosResponse.json();
    this.setState({
      todos: todoList,
    });
  };

  render() {
    return (
      <div>
        <div className="todo-container">
          <section>
            <h1 className="title">Add to do</h1>
          </section>
          <form onSubmit={this.addTodo}>
            <input
              value={this.state.text}
              onChange={this.handleChange}
              type="text" autoFocus
            ></input>
            <button className="btn-todo" type="submit">
              Add
            </button>
          </form>

          <h2 className="todo-title">
            {this.props.user.name.charAt(0).toUpperCase() +
              this.props.user.name.slice(1)}
            's Todo list
          </h2>
          <div className="todos">
            {this.state.todos.length > 0 ? (
              this.state.todos.map((t) => (
                <div className="todo-card" key={t.text}>
                  <div className="todo-item">
                    <h4 className="todo-name">{t.text}</h4>
                  </div>
                  <div>
                    <button
                      className="todo-btn"
                      onClick={() => {
                        this.deleteOne(t._id);
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="no">No todos. Enter a todo above!</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Todos;

