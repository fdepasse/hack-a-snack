import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostReview from './PostReview'
import Rating from 'react-rating'
import { Link } from 'react-router-dom'
import EditRecipeModal from './EditRecipe/EditRecipeModal'
import { useSpeechSynthesis } from 'react-speech-kit'
import { getLoggedInUserId } from './lib/auth'
import { isCreator } from '../lib/auth'
import { withRouter } from 'react-router-dom'



const SingleRecipe = ({ match, history }) => {
  const recipeId = match.params.recipeId
  const [recipe, updateRecipe] = useState({})
  const ingredientsList = recipe.ingredients
  const { speak, cancel } = useSpeechSynthesis()
  const userId = getLoggedInUserId()

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


  if (!recipe.user) {
    return null
  }

  function averageRating() {
    // Access the review array, filter to get an array of ratings excluding falsy value
    // Map over the filtered array to get an array of valid ratings
    const ratingsArray = recipe.review.filter(recipe => recipe.rating).map(recipe => recipe.rating)
    // Calculate the sum of all ratings
    const ratingsSum = ratingsArray.reduce((acc, rating) => acc + rating, 0)
    // Calculate the average rating
    const average = ratingsSum / ratingsArray.length
    // Round the average rating to nearest 0.5
    return Math.round(average * 2) / 2
  }

  function correctUserPage() {
    if (getLoggedInUserId() === recipe.user._id) {
      return '/myaccount'
    } else if (getLoggedInUserId() !== recipe.user._id) {
      return `/userrecipes/${recipe.user._id}`
    }
  }

  return <main className="hero is-fullheight is-center" id="herobackground">
    <div className="hero-body">
      <div className="container block box" id="singlerecipebox">
        <div className="columns">

          <div className="column is-two-fifths is-flex is-flex-direction-column" id="columnleft" style={{ alignItems: 'stretch' }}>
            <PostReview recipe={recipe} recipeId={recipeId} fetchRecipe={fetchRecipe} userId={userId} />
          </div>

          <div className="column is-three-fifths is-flex is-flex-direction-column" style={{ alignItems: 'stretch' }}>
            <div className="block box">
              {isCreator(recipe.user._id) && <EditRecipeModal recipeId={recipeId} history={history} fetchRecipe={fetchRecipe} />}
              <h1 className="title">{recipe.recipeName}</h1>
              <Link to={correctUserPage()} className="subtitle">{`Created by: ${recipe.user.username}`}</Link>
            </div>

            <div className="block box">
              <h5 className="subtitle">{recipe.review.length <= 1 ? `${recipe.review.length} review` : `${recipe.review.length} reviews`}</h5>
              <h5 className="subtitle">Average Rating: </h5>
              <Rating
                start={0}
                stop={5}
                initialRating={averageRating()}
                readonly={true}
                fractions={2}
              />
            </div>
            <h5 className="subtitle">{`Cooking time: ${recipe.cookingTime} minutes`}</h5>
            <h5 className="subtitle">{`Allergens: ${recipe.allergens}`}</h5>
            <div className="box" style={{ maxHeight: '475px', overflow: 'scroll' }}>
              <div className="buttons has-addons is-right">
                <button className="button is-dark is-rounded" onClick={() => speak({ text: ingredientsList })}>
                  Serenade me with the recipe</button>
                <button className="button is-light is-rounded" onClick={cancel}>Stop</button>
              </div>

              <h5 className="subtitle">{'Ingredients: '}</h5>
              {ingredientsList.map((ingredient, index) => {
                return <p key={index}>{ingredient}</p>
              })
              }
            </div>
            <div className="box">
              <h5 className="title">{'Method URL: '}</h5>
              <a className="subtitle" href={recipe.linkOrMethod} target="_blank" rel="noreferrer">{recipe.linkOrMethod}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main >
}

export default withRouter(SingleRecipe)

