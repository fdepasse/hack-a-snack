import React, { useState, useEffect } from 'react'
import axios from 'axios'
import getLoggedInUserId from '../lib/auth'

export default function UpdateProfileModal({ history }) {
  const [modal, showModal] = useState(false)

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
    const token = localStorage.getItem('token')
    try {
      const { data } = axios.put('/api/user/6034e770756bec3bc3697d80', formData, { 
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push('/myAccount/')
    } catch (err) {
      const errorMessage = err.response.data
      if (errorMessage.errors.hasOwnProperty('email')) {
        alert(errorMessage.errors.email.message)
      } else if (errorMessage.errors.hasOwnProperty('password')) {
        alert(errorMessage.errors.password.message)
      }
    }
  }


  return <>

    <div className="container">

      <button className="button is-danger" onClick={() => showModal(!modal)}>Edit yo account!  👩‍💻 </button>

    </div>
    <div role="button" className={`modal ${modal ? 'is-active' : ''}`}>

      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Update your profile...</p>
          <button className="delete" aria-label="close" onClick={() => showModal(!modal)} />
        </header>

        <section className="modal-card-body">
          <main className='column'>
            <div className='column is-flex is-flex-direction-column is-align-items-center'>

              <h1 className='title is-1'>Edit this</h1>
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
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={() => showModal(!modal)}>Cancel</button>
        </footer>
      </div>
    </div>

  </>

















}

