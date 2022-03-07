import { useState, useEffect } from 'react'

function Login() {
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
    <>
    <section>
        <h1>Log in</h1>
        <p>Log back in to use your To Do list</p>

    </section>
    <section>
        <form onSubmit={onSubmit}>  
            <div>
            <input type="email" className='form-control' id="email" name="email" value="{email}" placeholder="Enter your email" onChange={onChange}/>
            </div>
            <div>
            <input type="password" className='form-control' id="password" name="password" value="{password}" placeholder="Enter your password" onChange={onChange}/>
            </div>
        </form>
    </section>
    </>
  )
}

export default Login