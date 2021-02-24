import React, { useState } from 'react'
import axios from 'axios'
import Health from './Health'
import Select from 'react-select'
import Diet from './Diet'
import Allergens from './Allergens'

export default function AddRecipeModal({ history }) {

  const [formData, updateFormData] = useState({
    recipeName: '',
    description: '',
    linkOrMethod: '',
    servings: '',
    source: '',
    image: '',
    cookingTime: '',
    calories: '',
    healthLabels: [],
    diet: [],
    allergens: []
  })

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    updateFormData({
      ...formData,
      [name]: value
    })
  }

  // //! This will handle the image upload to Cloudinary
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


  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData,
      healthLabels: formData.healthLabels.map(health => health.value),
      diet: formData.diet.map(d => d.value),
      allergens: formData.allergens.map(allergen => allergen.value)
    }

    try {
      const { data } = await axios.post('/api/recipes', newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      history.push(`/recipes/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <main className='column'>
    <div className='column is-flex is-flex-direction-column is-align-items-center'>
      <h1 className='title is-1'>Recipes</h1>
      <form className='field' onSubmit={handleSubmit}>
        <div>
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
          <label className='label'>Method or Link to Method</label>
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
          <label className='label'>Servings</label>
          <div className='control'>
            <input className='input'
              type="text"
              value={formData.servings}
              onChange={handleChange}
              name={'servings'}
            />
          </div>
        </div>


        <div className='field'>
          <label className='label'>Source</label>
          <div className='control'>
            <input className='input'
              type="dropdown"
              value={formData.source}
              onChange={handleChange}
              name={'source'}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Cooking Time </label>
          <div className='control'>
            <input className='input'
              type="number"
              value={formData.cookingTime}
              onChange={handleChange}
              name={'cookingTime'}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Calories</label>
          <div className='control'>
            <input className='input'
              type="text"
              value={formData.calories}
              onChange={handleChange}
              name={'calories'}
            />
          </div>
        </div>

        <div className='field'>
          <label className="label">Health Labels</label>
          <Select
            defaultValue={[]}
            isMulti
            name="healthLabels"
            options={Health}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(healthLabels) => updateFormData({ ...formData, healthLabels })}
            value={formData.healthLabels}
          />
        </div>

        <div className='field'>
          <label className="label">Diet</label>
          <Select
            defaultValue={[]}
            isMulti
            name="healthLabels"
            options={Diet}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(diet) => updateFormData({ ...formData, diet })}
            value={formData.diet}
          />
        </div>

        <div className='field'>
          <label className="label">Allergens</label>
          <Select
            defaultValue={[]}
            isMulti
            name="allergens"
            options={Allergens}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(allergens) => updateFormData({ ...formData, allergens })}
            value={formData.allergens}
          />
        </div>


        <div className='field'>
          <label className='label'>Add an Image</label>
          <div className='control'>
            <button className="button" onClick={handleUpload}>Click to upload an image</button>
          </div>
        </div>
        <div className="control">
          <button className="button is-link">Create a recipe</button>
        </div>
      </form>
    </div>
  </main>
}

