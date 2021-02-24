import React, { useState } from 'react'
import axios from 'axios'

export default function Register({ history }) {
  // const [inputValue, updateInputValue] = useState('')

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    image: 'http://static1.squarespace.com/static/53959f2ce4b0d0ce55449ea5/578f8a2015d5db7814d1ffd0/588f5d6b3a0411d31b553a1a/1490712148195/',
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

  //! This will handle the image upload to Cloudinary
  function handleUpload(event) {
    event.preventDefault()
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'stressipes',
        uploadPreset: 'mww9imzw',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateFormData({
          ...formData,
          image: result.info.secure_url
        })
      }
    ).open()
  }




  function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = axios.post('/api/register', formData)
      console.log(data)
      history.push('/login')
    } catch (err) {
      const errorMessage = err.response.data

      if(errorMessage.errors.hasOwnProperty('email')){
        alert(errorMessage.errors.email.message)
      }
      else if(errorMessage.errors.hasOwnProperty('password')){
        alert('Please enter a valid password')
      }
    }
  }


  return <>
    <main className='column'>
      <div className='column is-flex is-flex-direction-column is-align-items-center'>

        <h1 className='title is-1'>Register</h1>
        <form className='field' onSubmit={handleSubmit}>



          <div className='field'>
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
          <div className='field'>
            <label className='label'>Profile Picture</label>
            <div className='control'>
              <button className="button" onClick={handleUpload}>Click to upload an image</button>
            </div>
          </div>
          
          <div className="control">
            <button className="button is-link">Register</button>
          </div>
        </form>
      </div>
    </main>

  </>




}

