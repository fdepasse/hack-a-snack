import React, { useState } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import Rating from 'react-rating'


export default function PostReview(props) {

  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  const token = localStorage.getItem('token')
  const recipes = props.recipe

  async function handleReview() {
    await axios.post(`/api/recipes/${recipes._id}/review`, { text: text, rating: rating }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    props.fetchRecipe()
    setText('')
  }


  async function handleDeleteReview(reviewId) {
    await axios.delete(`/api/recipes/${recipes._id}/review/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    props.fetchRecipe()
  }

  return <div className=" block box is-flex-direction-row">

    <div className="media-content" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    }}>
      <img src={recipes.image} alt={recipes.recipeName} style={{ borderRadius: '12px' }} />
      {isCreator(recipes.user._id) && <nav className="level is-mobile">
        <div className="level-right">
          {/* <button
            className="level-item"
            className="fas fa-heart"
            onClick={() => handleSaveRecipe(recipe._id)}>
          </button> */}
        </div>
      </nav>}
    </div>


    <h4 className="title">{'Reviews: '}</h4>
    <div className="subtitle box">{recipes.review && recipes.review.map(review => {
      return <article key={review._id} className="media">
        <div className="media-content">
          <div className="content">
            <p>{`${review.user.username}: ${review.text}`}</p>
          </div>
        </div>

        {isCreator(review.user._id) && <div className="media-right">
          <button
            className="delete"
            onClick={() => handleDeleteReview(review._id)}>
          </button>
        </div>}
      </article>
    })}</div>
    <div className="column box">



      <article className="media">
        <div className="media-content">
          <div className="field">
            <label className="label">Click to Rate</label>
            <div className="control">
              <Rating
                start={0}
                stop={5}
                quiet={false}
                fractions={2}
                onClick={value => setRating(value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Write your Review</label>
              <textarea
                className="textarea"
                placeholder="Write a review..."
                onChange={(event) => setText(event.target.value)}
                value={text}
              >
                {text}
              </textarea>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <button
                onClick={handleReview}
                className="button is-dark">
                Submit</button>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
}
