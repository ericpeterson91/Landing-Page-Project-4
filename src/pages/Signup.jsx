import { useState, useEffect } from 'react'
import './css/Signup.css'

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
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
    <div className="signup-container">
    <section>
        <h1>Sign Up</h1>

    </section>
    <section>
        <form onSubmit={onSubmit}>
            <div>
            <input type="text" className='form-control' id="name" name="name"  placeholder="Enter your name" onChange={onChange}/>
            </div>
            <div>
            <input type="email" className='form-control' id="email" name="email"  placeholder="Enter your email" onChange={onChange}/>
            </div>
            <div>
            <input type="password" className='form-control' id="password" name="password" placeholder="Enter your password" onChange={onChange}/>
            </div>
            <div>
            <input type="password" className='form-control' id="password2" name="password2"  placeholder="Confirm your password" onChange={onChange}/>
            </div>
            <button className="btn-signup">Sign up</button>
        </form>
    </section>
    </div>
  )
}

export default Signup