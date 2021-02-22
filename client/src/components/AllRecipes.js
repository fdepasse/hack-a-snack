import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AllRecipes = () => {
  const [recipeData, updateRecipeData] = useState([])
  const [loading, updateLoading] = useState(true)
  const [search, updateSearch] = useState('')

  //? We'll want to add a loading page/gif here because it takes a second for all recipes to load! Lodash?
  //? I added servings to the cards rather than cooking time as a lot of the recipes don't have a cooking time :)
  //? Search input on enter key?

  useEffect(() => {
    axios.get('/api/recipes')
      .then(axiosResp => {
        updateRecipeData(axiosResp.data)
      })
  }, [])

  return <section className="section">
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
}

export default AllRecipes