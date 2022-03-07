import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
  return (
    <nav>
        
        <ul>
            <li className="todo">
                <Link to ='/'>To dos</Link>
            </li>
            <li>
                <Link to='/signup'>Sign up</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/logout'>Log Out</Link>
            </li>
        </ul>
       
    </nav>
  )
}

export default Navbar