import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostReview from './PostReview'
import EditRecipeModal from './EditRecipe/EditRecipeModal'
import { useSpeechSynthesis } from 'react-speech-kit'



const SingleRecipe = ({ match, history }) => {
  const recipeId = match.params.recipeId
  const [recipe, updateRecipe] = useState({})
  const ingredientsList = recipe.ingredients
  const { speak, cancel  } = useSpeechSynthesis()


  async function fetchRecipe() {
    console.log('fetching recipe')
    try {
      console.log('inside try')
      const { data } = await axios.get(`/api/recipes/${recipeId}`)
      updateRecipe(data)
      console.log('state updated', data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [])

  // async function handleDelete() {
  //   const token = localStorage.getItem('token')
  //   await axios.delete(`/api/recipes/${recipeId}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   history.push('/recipes')
  // }

  if (!recipe.user) {
    return null
  }

  return <main>
    <div className="columns box is-four-fifths is-flex" id="singlerecipebox">
      <div className="column is-two-fifths is-flex">
        <div className="block box">
          <img src={recipe.image} alt={recipe.recipeName} />
          <PostReview recipe={recipe} fetchRecipe={fetchRecipe} />
          <EditRecipeModal />
        </div>
      </div>
      <div className="column is-three-fifths is-flex is-flex-direction-column">
        <div className="block box">
          <h1 className="title">{recipe.recipeName}</h1>
          <h2 className="subtitle">{`Created by: ${recipe.user.username}`}</h2>
        </div>
        <div className="block box">
          <h5 className="subtitle">{'Rating: '}</h5>
        </div>
        <div className="block box">
          <h5 className="subtitle">{`Cooking time: ${recipe.cookingTime} minutes`}</h5>
          <h5 className="subtitle">{`Allergens: ${recipe.allergens}`}</h5>
          <div className="box">
            <h5 className="subtitle">{'Ingredients: '}</h5>
            {ingredientsList.map((ingredient, index) => {
              return <p key={index}>{ingredient}</p>
            })
            }
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

