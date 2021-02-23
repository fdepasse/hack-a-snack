import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'


const SingleRecipe = ({ match, history }) => {
  const recipeId = match.params.recipeId
  const [recipe, updateRecipe] = useState({})
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')
  const ingredientsList = recipe.ingredients

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

  function reviewContent() {
    const reviews = recipe.review

    if (reviews.length === 0) {
      return 'No reviews yet...'
    } else {
      return reviews
    }
  }
  //! NEED TO CALL REVIEW CONTENT

  function handleReview() {
    axios.post(`/api/recipes/${recipe._id}/review`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        setText('')
        updateRecipe(resp.data)
      })
  }

  return <main>
    <div className="columns box is-four-fifths is-flex" id="singlerecipebox">
      <div className="column is-two-fifths is-flex">
        <div className="block box">
          <img src={recipe.image} alt={recipe.recipeName} />

          <div className="is-flex-direction-row">
            <h4 className="title">{'Reviews: '}</h4>
            <p className="subtitle box">{reviewContent()}</p>
            <div className="column box">
              <h2 className="subtitle">{recipe.user.username}</h2>

              {recipe.review && recipe.review.map(review => {
                return <article key={review._id} className="media">
                  <div className="media-content">
                    <div className="content">
                      <p className="subtitle">
                        {review.user.username}
                      </p>
                      <p>{review.text}</p>
                    </div>
                  </div>

                  {isCreator(review.user._id) && <div className="media-right">
                    <button
                      className="delete"
                      onClick={() => handleDeleteReview(review._id)}>
                    </button>
                  </div>}
                </article>
              })}

              <article className="media">
                <div className="media-content">
                  <div className="field">
                    <p className="control">
                      <textarea
                        className="textarea"
                        placeholder="Make a review.."
                        onChange={event => setText(event.target.value)}
                        value={text}
                      >
                        {text}
                      </textarea>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button
                        onClick={handleReview}
                        className="button is-dark"
                      >
                        Submit
              </button>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>

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
        <div className="block box">
          <h5 className="title">{'Method URL: '}</h5>
          <p className="subtitle box">{recipe.linkOrMethod}</p>
        </div>
      </div>
    </div>

  </main>
}

export default SingleRecipe