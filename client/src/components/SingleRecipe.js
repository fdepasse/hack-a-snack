import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostReview from './PostReview'
import Rating from 'react-rating'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import EditRecipeModal from './EditRecipe/EditRecipeModal'
import { useSpeechSynthesis } from 'react-speech-kit'



const SingleRecipe = ({ match, history }) => {
  const recipeId = match.params.recipeId
  const [recipe, updateRecipe] = useState({})
  const ingredientsList = recipe.ingredients
  const { speak, cancel } = useSpeechSynthesis()


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

  // async function handleSaveRecipe(recipeId) {
  //   await axios.put(`/api/myrecipes/${recipeId}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  // }


  if (!recipe.user) {
    return null
  }


  function averageRating() {
    // Access the review array, filter to get an array of ratings excluding falsy value
    // Map over the filtered array to get an array of valid ratings
    const ratingsArray = recipe.review.filter(recipe => recipe.rating).map(recipe => recipe.rating)
    console.log(ratingsArray)
    // Calculate the sum of all ratings
    const ratingsSum = ratingsArray.reduce((acc, rating) => acc + rating, 0)
    console.log(ratingsSum)
    // Calculate the average rating
    const average = ratingsSum / ratingsArray.length
    console.log(average)
    // Round the average rating to nearest 0.5
    return Math.round(average * 2) / 2
  }
  console.log(averageRating())

  return <main className="is-flex align-items-center">
    <div className="block box" id="singlerecipebox">
      <div className="columns">

        <div className="column is-two-fifths is-flex">
          <PostReview recipe={recipe} fetchRecipe={fetchRecipe} /*handleSaveRecipe={handleSaveRecipe}*/ />
          <EditRecipeModal history={history} recipeId={recipeId} fetchRecipe={fetchRecipe} />
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
          </div>
          <div className="block box">
            <h5 className="subtitle">{recipe.review.length} reviews</h5>
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
        <button className="button is-dark" onClick={() => speak({ text: ingredientsList })}>
          Speak the recipe to me</button>
        <button className="button is-light" onClick={cancel}>Stop</button>
        <div className="block box">
          <h5 className="title">{'Method URL: '}</h5>
          <a className="subtitle" href={recipe.linkOrMethod} target="_blank" rel="noreferrer">{recipe.linkOrMethod}</a>
        </div>

      </div>
    </div>
  </main >
}

{/* <div className="column is-three-fifths is-flex is-flex-direction-column">

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
        <a className="subtitle" href={recipe.linkOrMethod} target="_blank" rel="noreferrer">{recipe.linkOrMethod}</a>
      </div>
 */}


export default SingleRecipe

