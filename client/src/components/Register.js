import React, { useState } from 'react'
import axios from 'axios'

export default function Register({ history }) {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    updateFormData({
      ...formData,
      [name]: value
    })
  }


  async function handleSubmit(event) {
    event.preventDefault()
    try {
      // stop it from reloading my page.
      const { data } = await axios.post('/api/register', formData)
   
      // console.log('here is my data' + data)
      //go back to login page
      history.push('/login')
    } catch (err) {
      const errorMessage = err.response.data
   
      // if(errorMessage.errors.hasOwnProperty('email') && errorMessage.errors.hasOwnProperty('password')){
      //   console.log('you messed up the password and email error dood')
      // }
      if(errorMessage.errors.hasOwnProperty('email')){
        alert(errorMessage.errors.email.message)
      }
      else if(errorMessage.errors.hasOwnProperty('password')){
        alert(errorMessage.errors.password.message)
      }
    }
  }

  return <main className='column'>
    <div className='column is-flex is-flex-direction-column is-align-items-center'>
    <h1 className='title is-1'>Register</h1>
    <form className='field' onSubmit={handleSubmit}>
      <div>
        <label className='label'>Username</label>
        <div className='control'>
          <input className='input'
            type="text"
            value={formData.username}
            onChange={handleChange}
            name={'username'}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Email</label>
        <div className='control'>
          <input className='input'
            type="text"
            value={formData.email}
            onChange={handleChange}
            name={'email'}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Password</label>
        <div className='control'>
          <input className='input'
            type="password"
            value={formData.password}
            onChange={handleChange}
            name={'password'}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Password Confirmation</label>
        <div className='control'>
          <input className='input'
            type='password'
            value={formData.passwordConfirmation}
            onChange={handleChange}
            name={'passwordConfirmation'}
          />
        </div>
      </div>
      <div className="control">
        <button className="button is-link">Register</button>
      </div>
    </form>
    </div>
  </main>
}

