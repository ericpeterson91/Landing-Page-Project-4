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
            const fetchResponse = await fetch('/api/users/signup', {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password,})
            })
            
            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
            
            let token = await fetchResponse.json() 
            localStorage.setItem('token', token);  
            
            const userDoc = JSON.parse(atob(token.split('.')[1])).user; 
            this.props.setUserInState(userDoc)
      
          } catch (err) {
            console.log("SignupForm error", err)
            this.setState({ error: 'Sign Up Failed - Try Again' });
          }
        }
    


render(){
  return (
    <div className="signup-container">
      
      {(!this.props.user) ?
     <section>
        <h1>Sign Up</h1>
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
            <button type="submit"  className="btn-signup">Sign up</button>
        </form>
     </section>
    :
     <section>
      <h1 className="signin">Successfully signed up</h1>
     </section>
    }
    </div>
  )
}
}

export default Signup