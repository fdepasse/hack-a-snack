import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'


const SingleRecipe = ({ match, history }) => {
  const recipeId = match.params.recipeId
  const [recipe, updateRecipe] = useState({})

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { data } = await axios.get(`/api/recipes/${recipeId}`)
        updateRecipe(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRecipe()
  }, [])

  async function handleDelete() {
    const token = localStorage.getItem('token')
    await axios.delete(`/api/recipes/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/recipes')
  }

  if (!recipe.user) {
    return null
  }

  function reviewContent() {
    const reviews = recipe.review

    if (reviews.length === 0) {
      return 'No reviews yet...'
    } else {
      return reviews
    }
  }

  function listIngredients() {
    const ingredients = recipe.ingredients
    ingredients.map((ingredient) => {
      ingredients.push(ingredient)
    })
  }


  return <main>

    <div className="columns box is-four-fifths is-center" id="singlerecipebox">
      <div className="column is-two-fifths">
        <div className="block box is-centered">
          <img src={recipe.image} alt={recipe.recipeName} />
          {/* {isCreator(recipe.user._id) && <button
      className="button is-danger"
      onClick={handleDelete}
    >Delete recipe</button>}
    {isCreator(recipe.user._id) && <Link
      to={`/recipes/update-recipe/${recipe._id}`}
      className="button is-secondary"
    >Update Recipe</Link>} */}
        </div>
        <div className="block box">
          <div className="is-flex-direction-row">
            <h4 className="title">{'Reviews: '}</h4>
            <p className="subtitle box">{reviewContent()}</p>
          </div>
          <div className="block box">
            <h5 className="subtitle">{'Rating: '}</h5>
          </div>
        </div>
      </div>
      <div className="column is-three-fifths">
        <div className="block box">
          <h1 className="title">{recipe.recipeName}</h1>
          <h2 className="subtitle">{`Created by: ${recipe.user.username}`}</h2>
        </div>
        <div className="block box">
          <h5 className="subtitle">{`Cooking time: ${recipe.cookingTime} minutes`}</h5>
          <h5 className="subtitle">{`Allergens: ${recipe.allergens}`}</h5>
          <div className="box">
            <h5 className="subtitle">{'Ingredients: '}</h5>
            <p className="subtitle">{recipe.ingredients}</p>
          </div>
        </div>
        <div className="block box">
          <h5 className="title">{'Method URL: '}</h5>
          <p className="subtitle box">{recipe.linkOrMethod}</p>
        </div>
      </div>
    </div>

  </main>
}

export default SingleRecipe