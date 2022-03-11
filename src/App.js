import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react';
import Todos from './pages/Todos';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Quote from './pages/Quote'
import Logout from './pages/Logout'
import Goals from './pages/Goals'



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
      const payload = JSON.parse(atob(token.split('.')[1])); 
      if (payload.exp < Date.now() / 1000) {  
        localStorage.removeItem('token');
        token = null;
      } else { 
        let userDoc = payload.user 
        this.setState({user: userDoc})      
      }
    }
  }


  render(){
  return (
    <div>
      
      <Router>
        <Navbar removeUserFromState={this.removeUserFromState}/>
        <div>
          { this.state.user ?
          <Switch>
            <Route path='/todos'  exact render={(props) => 
                <Todos user={this.state.user} {...props}/>}/>
            <Route path='/goals' exact render={(props) => (
                <Goals user={this.state.user} {...props}/>)}/>
            <Route path='/motivate' exact render={(props) => (
                <Quote {...props}/>)}/>
                 <Route path='/signup' render={(props) => (
              <Signup user={this.state.user} setUserInState={this.setUserInState} {...props}/>)}/>
            <Route path='/login' render={(props) => (
                  <Login user={this.state.user} setUserInState={this.setUserInState} {...props}/>)}/>
            <Route path='/logout' render={(props) => (
              <Logout  {...props}/>)}/>
          </Switch>
         :   
         <Switch>
            <Route path='/signup' render={(props) => (
              <Signup user={this.state.user} setUserInState={this.setUserInState} {...props}/>)}/>
            <Route path='/login' render={(props) => (
              <Login user={this.state.user} setUserInState={this.setUserInState} {...props}/>)}/>
            <Route path='/logout' render={(props) => (
              <Logout {...props}/>)}/>
          </Switch>
        } 
        </div>
        
      </Router>
      
    </div>
  )

  }
  
  }

export default App;

