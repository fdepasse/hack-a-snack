import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Health from '../AddRecipe/Health'
import Select from 'react-select'
import Diet from '../AddRecipe/Diet'
import Allergens from '../AddRecipe/Allergens'
import { Link } from 'react-router-dom'
import Creatable from 'react-select/creatable'

export default function EditRecipeModal(props) {
  const [modal, showModal] = useState(false)
  const token = localStorage.getItem('token')
  const recipeId = props.recipeId
  const history = props.history

  const [formData, updateFormData] = useState({
    recipeName: '',
    description: '',
    linkOrMethod: '',
    servings: '',
    source: '',
    image: '',
    cookingTime: '',
    calories: '',
    ingredients: [],
    healthLabels: [],
    diet: [],
    allergens: []
  })

  // ! Get request to populate form fields
  useEffect(() => {
    axios.get(`/api/recipes/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        const mappedFormData = {
          ...data,
          diet: data.diet.map(type => {
            return { value: type, label: type[0].toUpperCase() + type.slice(1) }
          }),
          healthLabels: data.healthLabels.map(type => {
            return { value: type, label: type[0].toUpperCase() + type.slice(1) }
          }),
          allergens: data.allergens.map(type => {
            return { value: type, label: type[0].toUpperCase() + type.slice(1) }
          }),
          ingredients: data.ingredients.map(type => {
            return { value: type, label: type[0].toUpperCase() + type.slice(1) }
          })
        }
        updateFormData(mappedFormData)
      })
  }, [])


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
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData,
      healthLabels: formData.healthLabels.map(health => health.value),
      diet: formData.diet.map(d => d.value),
      allergens: formData.allergens.map(allergen => allergen.value),
      ingredients: formData.ingredients.map(i => i.value)
    }

    try {
      const { data } = await axios.put(`/api/recipes/${recipeId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })

    } catch (err) {
      console.log(err.response.data)
    }
    props.fetchRecipe()
    showModal(!modal)
    

  }

  async function handleDelete(recipeId) {
    const token = localStorage.getItem('token')
    await axios.delete(`/api/recipes/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/recipes')
  }

  return <>
    <div className="buttons had-addons is-right">
      <button className="button is-dark is-rounded" onClick={() => showModal(!modal)}>Edit</button>
      <button className="button is-dark is-rounded" onClick={() => handleDelete(recipeId)}>Delete</button>
    </div>
    <div role="button" className={`modal ${modal ? 'is-active' : ''}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Update this recipe...</p>
          <button className="delete" aria-label="close" onClick={() => showModal(!modal)} />
        </header>
        <section className="modal-card-body">
          <main className='column'>
            <div className='column is-flex is-flex-direction-column is-align-items-center'>
              <h1 className="title is-1">Edit below..</h1>
              <form className='field' onSubmit={handleSubmit}>
                <div className="field-body">
                  <div className='field'>
                    <label className='label'>Recipe name</label>
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
                  <label className="label">Ingredients</label>
                  <div className='control'>
                    <Creatable
                      isClearable
                      isMulti
                      components={
                        { DropdownIndicator: null }
                      }
                      name="Ingredients"
                      placeholder='E.g. 1 tps of sugar...(Type and press enter...)'
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(ingredients) => updateFormData({ ...formData, ingredients })}
                      value={formData.ingredients}
                    />
                  </div>
                </div>
                <div className="field-body">
                  <div className='field'>
                    <label className='label'>Servings</label>
                    <div className='control'>
                      <input className='input'
                        type="dropdown"
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
                </div>
                <div className="field-body">
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
                </div>
                <div className="field-body">
                  <div className='field'>
                    <label className="label">Health</label>
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
                    <div className="file has-name">
                      <label className="file-label">
                        <input className="file-input" type="file" name="resume" />
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-upload" />
                          </span>
                          <span className="file-label" onClick={handleUpload}>Choose a file…</span>
                        </span>
                        <span className="file-name">Screen Shot 2017-07-29 at 15.54.25.png</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={() => showModal(!modal)}>Cancel</button>
          <button className="button is-link" onClick={handleSubmit} >Update your recipe</button>
        </footer>
      </div>
    </div>







  </>


}

