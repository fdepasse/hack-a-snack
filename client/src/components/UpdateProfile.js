import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'

export default function UpdateProfileModal(props) {
  const [modal, showModal] = useState(false)
  const token = localStorage.getItem('token')
  const history = props.history



  const [formData, updateFormData] = useState({
    username: '',
    image: ''
  })


  // ! Get request to populate form fields
  useEffect(() => {
    axios.get(`/api/user/${getLoggedInUserId()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        updateFormData(data)
        console.log(data)
        console.log(formData)
      })
  }, [])


  //! This will handle the image upload to Cloudinary
  function handleUpload(event) {
    //!! prevent event default gives a scatty error
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


  //!!get values from input and map to form fields!

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    updateFormData({
      ...formData,
      [name]: value
    })
  }




  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = axios.put(`/api/user/${getLoggedInUserId()}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push('/')
    } catch (err) {
      const errorMessage = err.response.data
      if (errorMessage.errors.hasOwnProperty('email')) {
        alert(errorMessage.errors.email.message)
      } else if (errorMessage.errors.hasOwnProperty('password')) {
        alert(errorMessage.errors.password.message)
      }
    }
    showModal(!modal)
  }


  return <>

    <div className="container">

      <button className="button is-danger" onClick={() => showModal(!modal)}>Edit yo account!  👩‍💻 </button>

    </div>
    <div role="button" className={`modal ${modal ? 'is-active' : ''}`}>

      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
          <button className="delete" aria-label="close" onClick={() => showModal(!modal)} />
        </header>

        <section className="modal-card-body">
          <main className='column'>
            <div className='column is-flex is-flex-direction-column is-align-items-center'>

              <div>
                <h1 className='label'>Hello! {formData.username}</h1>
              </div>
              <div>
                <figure className="image is-128x128">
                  <img className="is-rounded" src={formData.image} />
                </figure>
              </div>


              <form className='field'>


                <div className='field'>

                  <label className='label-text'>Username</label>
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
                  <label className='label-text'>Profile Picture</label>
                  <div className='control'>
                    <button className="button" onClick={handleUpload}>Click to upload an image</button>
                  </div>
                </div>

                <div className="control">
                </div>
              </form>
            </div>
          </main>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-rounded" onClick={() => showModal(!modal)}>Cancel</button>
          <button className="button is-rounded" onClick={handleSubmit}>Update your profile</button>
        </footer>
      </div>
    </div>

  </>

















}

