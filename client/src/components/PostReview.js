import React, { useState } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import Rating from 'react-rating'


export default function PostReview(props) {

  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  const token = localStorage.getItem('token')
  const recipes = props.recipe
  const [toggle, setToggle] = useState(false)
  const userId = props.userId
  const [loading, updateLoading] = useState(true)
  const [formData, updateFormData] = useState({})
  const [savedRecipes, updateSavedRecipes] = useState([])

  console.log(userId)
  console.log(toggle)


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

  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const { data } = await axios.get('/api/user/60353f2118592b8553341e80')
  //       updateSavedRecipes(data)
  //       console.log(data, 'line 39')
  //       updateLoading(false)
  //       // const toggleData = data.savedRecipes.includes(recipeId)
  //       // setToggle(toggleData)

  //     } catch (err) {
  //       console.log(err)
  //     }

  //   }
  //   getUser()
  // }, [])

//   useEffect(() => {
//   async function getUser(userId) {
//     axios.get(`/api/user/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(({ data }) => {
//         updateFormData(data)
//         console.log(data)
//         console.log(formData)
//       })
//   }
// getUser()
//   }, [])


  console.log(savedRecipes, 'line 46')

  async function handleSaveRecipe(recipeId, authToken, event) {
    setToggle(event.target.checked)
    try {
      if (toggle === false) {
        await axios.put(`/api/myrecipes/${recipeId}`, {}, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
        alert('saved to my collection')
        fetchRecipe()
      } else {
        await axios.put(`/api/myrecipes/unstar/${recipeId}`, {}, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
        alert('recipe unstarred from collection')
        fetchRecipe()
      }

    } catch (err) {
      console.log(err)
    }
  }


  return <div className="block">

    <article className="media" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    }}>
      <div className="media-content">
        <div className="content">
          <figure className="image is-640x640">
            <img src={recipes.image} alt={recipes.recipeName} style={{ borderRadius: '12px' }} />
          </figure>
          <nav className="level is-mobile level-right">
            {/* <div className="level-right">
              <button className="level-item" onClick={() => handleSaveRecipe(props.recipeId, token)}>❤️</button>
            </div> */}

            <div className="pretty p-switch p-fill">
              <input type="checkbox" onChange={(event) => handleSaveRecipe(props.recipeId, token, event)} />
              <div className="state">
                <label>Add to saved recipes</label>
              </div>
            </div>


          </nav>
        </div>
      </div>
    </article>


    <h4 className="title">{'Reviews: '}</h4>
    <div className="subtitle box" style={{ maxHeight: '200px', overflow: 'scroll' }}>{recipes.review && recipes.review.map(review => {
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