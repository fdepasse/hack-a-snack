import React, { useState } from 'react'
import axios from 'axios'
import Health from './Health'
import Select from 'react-select'
import Diet from './Diet'
import Allergens from './Allergens'
import Creatable from 'react-select/creatable'

export default function AddRecipeModal({ history }) {


  //!! FORM FIELDS WILL START EMPTY
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

  console.log(formData)
  console.log(updateFormData)


  //!! THIS WILL MATCH THE VALUES INPUTTED TO THE FORM INPUTS
  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    updateFormData({
      ...formData,
      [name]: value
    })
    console.log(event)
  }

  //!! 


  //! THIS FUNCTION WILL HANDLE IMAGE UPLOAD
  //!! PREVENT DEFAULT EVENT SO IT SUBMITS WITH THE ENTIRE FORM
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
      //! THESE ARE FOR REACT SELECT, YOU NEED TO MAP OVER ITEMS IN THE ARRAY AND GIVES VALUES TO MONGO//MONGOOSE
      healthLabels: formData.healthLabels.map(health => health.value),
      diet: formData.diet.map(d => d.value),
      allergens: formData.allergens.map(allergen => allergen.value),
      ingredients: formData.ingredients.map(i => i.value)

    }

    try {
      const { data } = await axios.post('/api/recipes', newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      //!! PUSH USER RECIPE THEY HAVE JUST CREATED
      history.push(`/recipes/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <section className="hero">
    <div className="hero-body" id="herobackground">
      <div className="columns">
        <main className='column'>
          <div className='column is-flex is-flex-direction-column is-align-items-center'>
            <h1 className="title is-1">Create a recipe..</h1>
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



              <div className="control">
                <button className="button is-link">Create a recipe</button>
              </div>





            </form>




          </div>
        </main>
        <div className="column">
        </div>
      </div>
    </div>
  </section>






}

