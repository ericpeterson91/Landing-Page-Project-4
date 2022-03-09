import { useState, useEffect } from 'react'
import './css/Login.css'

function Logout() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {name, email, password, password2} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div className="login-container">
    <section>
        <h1>Log Out</h1>
        {/* <p>Log back in to use your To Do list</p> */}

    </section>
    <section className="input">
        <form onSubmit={onSubmit}>  
            <div>
            <input type="email" className='form-control' id="email" name="email"  placeholder="Enter your email" onChange={onChange}/>
            </div>
            <div>
            <input type="password" className='form-control' id="password" name="password"  placeholder="Enter your password" onChange={onChange}/>
            </div>
            <button className="btn-login">Log Out</button>
        </form>
    </section>
    </div>
  )
}

export default Logout