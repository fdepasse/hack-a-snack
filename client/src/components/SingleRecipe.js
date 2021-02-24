import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostReview from './PostReview'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import EditRecipeModal from './EditRecipe/EditRecipeModal'
import { useSpeechSynthesis } from 'react-speech-kit'



const SingleRecipe = ({ match, history }) => {
  const recipeId = match.params.recipeId
  const [recipe, updateRecipe] = useState({})
  const ingredientsList = recipe.ingredients
  const { speak, cancel  } = useSpeechSynthesis()


  // console.log(match.params.user, 'line 13')
  async function fetchRecipe() {

    try {
      const { data } = await axios.get(`/api/recipes/${recipeId}`)
      updateRecipe(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [])

  async function handleDelete() {
    const token = localStorage.getItem('token')
    await axios.delete(`/api/recipes/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/recipes')
  }

  async function handleSaveRecipe(recipeId) {
    await axios.put(`/api/myrecipes/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  if (!recipe.user) {
    return null
  }

  return <main className="is-flex align-items-center">
    <div className="block box" id="singlerecipebox">
      <div className="columns">
        <div className="column is-two-fifths is-flex">
 
            <PostReview recipe={recipe} fetchRecipe={fetchRecipe} handleSaveRecipe={handleSaveRecipe}/>
            <EditRecipeModal />
       
        </div>
        <div className="column is-three-fifths is-flex is-flex-direction-column">
          <div className="block box">
            {isCreator(recipe.user._id) &&
              <div className="buttons has-addons is-right">
                <button className="button is-dark" onClick={handleDelete}>Delete</button>
                <Link className="button is-dark">Edit</Link>
              </div>
            }

            <h1 className="title">{recipe.recipeName}</h1>
            <Link to={`/userrecipes/${recipe.user._id}`} className="subtitle">{`Created by: ${recipe.user.username}`}</Link>

            <div className="block box">
              <h5 className="subtitle">{'Rating: '}</h5>
            </div>

            <h5 className="subtitle">{`Cooking time: ${recipe.cookingTime} minutes`}</h5>
            <h5 className="subtitle">{`Allergens: ${recipe.allergens}`}</h5>
            <div className="box">
              <h5 className="subtitle">{'Ingredients: '}</h5>
              {ingredientsList.map((ingredient, index) => {
                return <p key={index}>{ingredient}</p>
              })
              }
            </div>

            <h5 className="title">{'Method URL: '}</h5>
            <p className="subtitle box">{recipe.linkOrMethod}</p>
          </div>
        </div>
        <button className="button is-dark" onClick={() => speak({ text: ingredientsList })}>
              Speak the recipe to me</button>
        <button className="button is-light" onClick={cancel}>Stop</button>
        <div className="block box">
          <h5 className="title">{'Method URL: '}</h5>
          <p className="subtitle box">{recipe.linkOrMethod}</p>
          
        </div>
      </div>
    </div>
  </main>
}

export default SingleRecipe

