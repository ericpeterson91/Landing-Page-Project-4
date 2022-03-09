import React from 'react'
import './css/Signup.css'

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
      };
    

    onChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
        });
      };

    

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            // 1. POST our new user info to the server
            const fetchResponse = await fetch('/api/users/signup', {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password,})
            })
            
            // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
            console.log(fetchResponse)
            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
            
            let token = await fetchResponse.json() // 3. decode fetch response to get jwt from srv
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
    <div className="signup-container">
    <section>
        <h1>Sign Up</h1>

    </section>
    <section>
        <form autoComplete="off" onSubmit={this.onSubmit}>
            <div>
            <input type="text" className='form-control' id="name" name="name" value={this.state.name}  placeholder="Enter your name" onChange={this.onChange} required />
            </div>
            <div>
            <input type="email" className='form-control' id="email" name="email"value={this.state.email}  placeholder="Enter your email" onChange={this.onChange} required />
            </div>
            <div>
            <input type="password" className='form-control' id="password" name="password" value={this.state.password} placeholder="Enter your password" onChange={this.onChange} required />
            </div>
            <div>
            <input type="password" className='form-control' id="confirm" name="confirm" value={this.state.confirm} placeholder="Confirm your password" onChange={this.onChange} required />
            </div>
            <button type="submit" className="btn-signup">Sign up</button>
        </form>
    </section>
    </div>
  )
}
}

export default Signup