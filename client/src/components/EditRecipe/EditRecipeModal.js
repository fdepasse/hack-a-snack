import React, { useState, useEffect } from 'react'
// import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Health from '../AddRecipe/Health'
import Select from 'react-select'
import Diet from '../AddRecipe/Diet'
import Allergens from '../AddRecipe/Allergens'


const EditRecipeModal = (props) => {
  const [modal, showModal] = useState(false)
  const recipeId = props.recipeId
  const token = localStorage.getItem('token')
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
    healthLabels: [],
    diet: [],
    allergens: []
  })

  async function handleDelete(recipeId) {
    await axios.delete(`/api/recipes/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/recipes')
  }

  // ! Get request to populate form fields
  useEffect(() => {
    axios.get(`/api/recipes/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        updateFormData(data)
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

  console.log('history ' + history)

  async function handleSubmit(event) {
    event.preventDefault()

    const newFormData = {
      ...formData,
      healthLabels: formData.healthLabels.map(health => health.value),
      diet: formData.diet.map(d => d.value),
      allergens: formData.allergens.map(allergen => allergen.value)
    }

    try {
      const { data } = await axios.put(`/api/recipes/${recipeId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log('2  ' + data)
    } catch (err) {
      console.log(err.response.data)
    }
    props.fetchRecipe()
    showModal(!modal)


  }


  return <>
  
        <div className="buttons has-addons is-right">
          <button className="button is-dark" onClick={() => showModal(!modal)}>Edit</button>
          <button className="button is-dark" onClick={() => handleDelete(recipeId)}>Delete</button>
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
              <h1 className='title is-1'>Edit Yo Recipes</h1>
              <form className='field' >
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


                <div className='field'>
                  <label className='label'>Add an Image</label>
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
          <button className="button" onClick={() => showModal(!modal)}>Cancel</button>
          <button className="button is-link" onClick={handleSubmit} >Update your recipe</button>
        </footer>
      </div>
    </div>







  </>


}

export default EditRecipeModal