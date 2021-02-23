import React, { useState } from 'react'
import axios from 'axios'

export default function Login({ history }) {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
        console.log(localStorage)
        console.log(data)
      }
      history.push('/recipes')
    } catch (err) {
      alert(err.response.data.message)
      // console.log(err.response.data)
    }
  }

  return <main className='column'>
    <div className='column is-flex is-flex-direction-column is-align-items-center'>
      <h1 className='title is-1'>Login</h1>
      <form className='field' onSubmit={handleSubmit}>
        <div>
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
        <div className="control">
          <button className="button is-link">Login</button>
        </div>
      </form>
    </div>
  </main>
}