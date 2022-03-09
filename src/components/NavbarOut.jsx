import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
  return (
    <nav>
        
        <ul>
            <li className="todo">
                <Link className="link" to ='/'>Sign in to see</Link>
            </li>
            <li>
                <Link className="link" to='/'>Sign in to see</Link>
            </li>
            <li>
                <Link className="link" to='/signup'>Sign up</Link>
            </li>
            <li>
                <Link className="link" to='/login'>Login</Link>
            </li>
            <li>
                <Link className="link" to='/'>Sign in to see</Link>
            </li>
        </ul>
       
    </nav>
  )
}

export default Navbar