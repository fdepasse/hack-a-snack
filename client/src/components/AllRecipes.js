import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AllRecipes = ({ history }) => {
  const [recipeData, updateRecipeData] = useState([])
  const [searchData, updateSearchData] = useState('')
  const [loading, updateLoading] = useState(true)

  //? We'll want to add a loading page/gif here because it takes a second for all recipes to load! Lodash?
  //? I added servings to the cards rather than cooking time as a lot of the recipes don't have a cooking time :)
  //? Search input on enter key?

  useEffect(() => {
    axios.get('/api/recipes')
      .then(({ data }) => {
        updateRecipeData(data)
        updateLoading(false)
      })
  }, [])

  if (loading) {
    return <h1 className="subtitle">Loading...</h1>
  }

  function handleSubmit(event) {
    event.preventDefault()
    try {
      history.push({ pathname: '/search', state: searchData })
    } catch (err) {
      console.log(err)
    }
  }

  return <main>
    <section className="section">
      <div className="column">
        <h1 className="title">ALL RECIPES</h1>
        <h3 className="subtitle">SEARCH FOR A NEW RECIPE</h3>
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
              <button className="button is-rounded">Search</button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {recipeData.map((recipe, index) => {
            return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <Link to={`/recipes/${recipe._id}`}>
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-5">{recipe.recipeName}</p>
                        <p className="subtitle is-6">{'Serves: ' + recipe.servings}</p>
                        <p className="subtitle is-6">{'Added by: ' + recipe.user.username}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={recipe.image} alt={recipe.name} />
                    </figure>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>
  </main>
}

export default AllRecipes