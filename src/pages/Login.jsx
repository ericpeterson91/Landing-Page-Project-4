import React from 'react'
import './css/Login.css'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error: ''
      };
    
    

    onChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
        });
      };

    onSubmit = async (evt) => {
        evt.preventDefault();
    try {
      // 1. POST our new user info to the server
      const fetchResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.state.email, password: this.state.password, })
      })

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

      let token = await fetchResponse.json() // 3. decode fetch response: get jwt token from srv
      localStorage.setItem('token', token);  // 4. Stick token into localStorage

      const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
      this.props.setUserInState(userDoc)

    } catch (err) {
      console.log("SignupForm error", err)
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  }
    


render(){
  return (
    <div className="login-container">
    <section>
        <h1>Log In</h1>

    </section>
    <section>
        <form autoComplete="off" onSubmit={this.onSubmit}>
            <div>
            <input type="email" className='form-control' id="email" name="email"value={this.state.email}  placeholder="Enter your email" onChange={this.onChange} required />
            </div>
            <div>
            <input type="password" className='form-control' id="password" name="password" value={this.state.password} placeholder="Enter your password" onChange={this.onChange} required />
            </div>
            <button type="submit" className="btn-login">Log in</button>
        </form>
    </section>
    </div>
  )
}
}

export default Login