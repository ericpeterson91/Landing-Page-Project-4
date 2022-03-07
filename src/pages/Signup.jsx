import { useState, useEffect } from 'react'

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
    <>
    <section>
        <h1>Register</h1>
        <p>Sign up</p>

    </section>
    <section>
        <form onSubmit={onSubmit}>
            <div>
            <input type="text" className='form-control' id="name" name="name" value="{name}" placeholder="Enter your name" onChange={onChange}/>
            </div>
            <div>
            <input type="email" className='form-control' id="email" name="email" value="{email}" placeholder="Enter your email" onChange={onChange}/>
            </div>
            <div>
            <input type="password" className='form-control' id="password" name="password" value="{password}" placeholder="Enter your password" onChange={onChange}/>
            </div>
            <div>
            <input type="password" className='form-control' id="password2" name="password2" value="{password2}" placeholder="Confirm your name" onChange={onChange}/>
            </div>
        </form>
    </section>
    </>
  )
}

export default Signup