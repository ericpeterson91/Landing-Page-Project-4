import React from "react";
import "./css/Goals.css";

class Goals extends React.Component {
  state = {
    goals: [],
    text: "",
  };


  addGoal = async (e) => {
    e.preventDefault();
    try {
      let jwt = localStorage.getItem("token");
      let fetchResponse = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ text: this.state.text }), 
      });
      let serverResponse = await fetchResponse.json();
      console.log("Success:", serverResponse); 

      
      let fetchGoalsResponse = await fetch("api/goals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      let goalList = await fetchGoalsResponse.json();
      console.log(goalList);
      console.log(serverResponse);

      this.setState({ goals: goalList, text: "" }); 
    } catch (err) {
      console.error("Error:", err); 
    }
  };

  async componentDidMount() {
    try {
      let jwt = localStorage.getItem("token");
      let fetchGoalsResponse = await fetch("api/goals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      let goalList = await fetchGoalsResponse.json();

      this.setState({
        goals: goalList,
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
      console.log("hi");
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
    let fetchResponse = await fetch(`api/goals/${id}/${this.props.user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ text: this.state.text }),
    });

    let fetchGoalsResponse = await fetch("api/goals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    let goalList = await fetchGoalsResponse.json();
    this.setState({
      goals: goalList,
    });
  };

  render() {
    return (
      <div>
        <div className="goal-container">
          <section>
            <h1 className="title">Add a goal</h1>
          </section>
          <form onSubmit={this.addGoal}>
            <input
              value={this.state.text}
              onChange={this.handleChange}
              type="text" autoFocus
            ></input>
            <button className="btn-goal" type="submit">
              Add
            </button>
          </form>

          <h2 className="goal-title">
            {this.props.user.name.charAt(0).toUpperCase() +
              this.props.user.name.slice(1)}
            's Goal list
          </h2>
          <div className="goals">
            {this.state.goals.length > 0 ? (
              this.state.goals.map((t) => (
                <div className="goal-card" key={t.text}>
                  <div className="goal-item">
                    <h4 className="goal-name">{t.text}</h4>
                  </div>
                  <div>
                    <button
                      className="goal-btn"
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
                <h1 className="no">No goals. Enter a goal above!</h1>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Goals;
