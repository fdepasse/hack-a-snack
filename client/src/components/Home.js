import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ShuffleCarousel from './randomShuffle'

const Home = ({ history }) => {
  const [recipeData, updateRecipeData] = useState({})
  const [searchData, updateSearchData] = useState('')


  useEffect(() => {
    axios.get('/api/random-recipe')
      .then(({ data }) => {
        updateRecipeData(data)
      })
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    try {
      history.push({ pathname: '/search', state: searchData })
    } catch (err) {
      console.log(err)
    }
  }




  return <main id="herobackground">
    <div className="columns is-centered is-multiline">
      <section className="section">
        <div className="column">
          <h1 className="title homepage-title is-size-1 has-text-white">Welcome to Hack A Snack</h1>
          <h3 className="subtitle has-text-white">Search for a New Recipe</h3>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <div className="control">
                <input
                  onChange={(event) => updateSearchData(event.target.value)}
                  className="input is-rounded"
                  type="text"
                  placeholder="Enter your search here"
                  value={searchData}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-dark is-rounded">Search</button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="column"></div>
      </section>

      <section className="section">
        <div className="column has-text-centered">
          <h2 className="title homepage-title is-size-1 has-text-white">Why not try...</h2>
          <Link className="card" to={`/recipes/${recipeData._id}`}>
            <div className="card-image">
              <figure className="image is-square">
                <img src={recipeData.image} alt={recipeData.recipeName} style={{ borderRadius: '12px' }} />
              </figure>
            </div>
            <div className="media">
              <div className="media-content">
                <p className="title is-6 pt-3 has-text-white">{recipeData.recipeName}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>



    </div>
    <section className="section">
      <ShuffleCarousel />
    </section>
  </main>
}

export default Home