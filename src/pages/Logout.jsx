import { useState, useEffect } from 'react'
import './css/Login.css'

function Logout(props) {
    
  return (
    <div className="login-container">
        <button onClick={props.removeUserFromState}>Logout</button>
    </div>
  )
}

export default Logout