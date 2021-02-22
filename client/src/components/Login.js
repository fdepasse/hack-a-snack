import React, { useState } from 'react'
import axios from 'axios'

const Login = ({ history }) => {

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
      }
      history.push('/')
    } catch (err) {
      // ? Handle any error in here.
      console.log(err.response)
    }
  }


  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.email}
              onChange={handleChange}
              name={'email'}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              value={formData.password}
              onChange={handleChange}
              name={'password'}
            />
          </div>
        </div>
        <button className="button">Submit</button>
      </form>
    </div>
  </div>





}

export default Login