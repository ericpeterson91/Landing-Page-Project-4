import React from "react";
import "./css/Login.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json(); 
      localStorage.setItem("token", token); 

      const userDoc = JSON.parse(atob(token.split(".")[1])).user; 
      this.props.setUserInState(userDoc);
    } catch (err) {
      console.log("SignupForm error", err);
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    return (
      <div className="login-container">
        {!this.props.user ? (
          <section>
            <h1>Log In</h1>
            <form autoComplete="off" onSubmit={this.onSubmit}>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Enter your email"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Enter your password"
                  onChange={this.onChange}
                  required
                />
              </div>
              <button type="submit" className="btn-login">
                Log in
              </button>
            </form>
          </section>
        ) : (
          <section>
            <h1 className="login">Successfully logged in</h1>
          </section>
        )}
      </div>
    );
  }
}

export default Login;
