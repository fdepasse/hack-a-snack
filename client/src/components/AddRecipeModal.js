import React, { useState } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'





const AddRecipeModal = ({ history }) => {
  const [inputValue, updateInputValue] = useState('')

  const [formData, updateFormData] = useState([
    {
      ingredients: [''],
      diet: [''],
      healthLabels: [''],
      allergens: [''],
      recipeName: '',
      description: '',
      linkOrMethod: '',
      image: '',
      servings: '',
      source: '',
      cookingTime: '',
      calories: ''
    }
  ])

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    updateInputValue(event.target.value)
    updateFormData({
      ...formData,
      [name]: value
    })
  }

  function handleUpload() {
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



  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/recipes', formData)
      history.push('/')
    } catch (err) {
      // const errorMessage = err.response.data
      // if (errorMessage.errors.hasOwnProperty('email')) {
      //   alert(errorMessage.errors.email.message)
      // } else if (errorMessage.errors.hasOwnProperty('password')) {
      //   alert(errorMessage.errors.password.message)
      // }
    }
  }


  return <>
    <main className='column'>
      <div className='column is-flex is-flex-direction-column is-align-items-center'>

        <h1 className='title is-1'>Post a recipe</h1>
        <form className='field' onSubmit={handleSubmit}>

          <div className='field'>
            <label className='label'>Recipe Name</label>
            <div className='control'>
              <input className='input'
                type="text"
                value={formData.recipeName}
                onChange={handleChange}
                name={'recipeName'}
              />
            </div>
          </div>


          <div className='field'>
            <label className='label'>Description</label>
            <div className='control'>
              <input className='input'
                type="text"
                value={formData.description}
                onChange={handleChange}
                name={'description'}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Image</label>
            <div className='control'>
              <button className="button" onClick={handleUpload}>Click to upload an image</button>
            </div>
          </div>

          <div className='field'>
            <label className='label'>Method</label>
            <div className='control'>
              <input className='input'
                type="text"
                value={formData.linkOrMethod}
                onChange={handleChange}
                name={'linkOrMethod'}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Ingredients this will need react select</label>
            <div className='control'>
              <input className='input'
                type='text'
                value={formData.ingredients}
                onChange={handleChange}
                name={'ingredients'}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Source</label>
            <div className='control'>
              <input className='input'
                type='text'
                value={formData.source}
                onChange={handleChange}
                name={'source'}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Diet</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Diet</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>


          <div className='field'>
            <label className='label'>Servings</label>
            <div className='control'>
              <input className='input'
                type='text'
                value={formData.servings}
                onChange={handleChange}
                name={'servings'}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Servings</label>
            <div className='control'>
              <input className='input'
                type='text'
                value={formData.servings}
                onChange={handleChange}
                name={'servings'}
              />
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

export default AddRecipeModal