import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SearchResults = ({ location, history }) => {
  const [recipeData, updateRecipeData] = useState([])
  const [searchData, updateSearchData] = useState(location.state)
  const [filterSelected, updateFilterSelected] = useState('All')

  useEffect(() => {
    axios.get('/api/search', { params: { q: searchData } })
      .then(({ data }) => {
        updateRecipeData(data)
      })
  }, [])


  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.get('/api/search', { params: { q: searchData } })
      updateRecipeData(data)
      history.push({ pathname: '/search', state: searchData })
      updateFilterSelected('All')
    } catch (err) {
      console.log(err)
    }
  }

  function filterRecipes() {
    return recipeData.filter(recipe => {
      if (filterSelected === 'All') {
        return recipeData
        // This make sure the filter is not updating unless a new search is submitted
      } else if (searchData === location.state) {
        if (filterSelected === 'Recipe Name') {
          return recipe.recipeName.toLowerCase().includes(searchData.toLowerCase())
        } else {
          return recipe.ingredients.join('').toLowerCase().includes(searchData.toLowerCase().split(' ').join(''))
        }
      } else {
        if (filterSelected === 'Recipe Name') {
          return recipe.recipeName.toLowerCase().includes(location.state.toLowerCase())
        } else {
          return recipe.ingredients.join('').toLowerCase().includes(location.state.toLowerCase().split(' ').join(''))
        }
      }
    })
  }

  return <main className="has-background-black">
    <section className="section">
      <div className="column">
        <h1 className="title has-text-white">Results</h1>
        <h3 className="subtitle has-text-white">{`${recipeData.length} recipes found`}</h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                onChange={event => updateSearchData(event.target.value)}
                className="input"
                type="text"
                placeholder="Enter your search here"
                value={searchData}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button">Search</button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <section className="section">
      <div className="block">
        <h4 className="subtitle has-text-white">Show Results by:</h4>
      </div>
      <div className="tabs is-boxed">
        <ul>
          <li
            onClick={() => updateFilterSelected('All')}
            className={`${filterSelected === 'All' ? 'is-active' : ''}`}>
            <a>All</a>
          </li>
          <li
            onClick={() => updateFilterSelected('Recipe Name')}
            className={`${filterSelected === 'Recipe Name' ? 'is-active' : ''}`}>
            <a>Recipe Name</a>
          </li>
          <li
            onClick={() => updateFilterSelected('Ingredients')}
            className={`${filterSelected === 'Ingredients' ? 'is-active' : ''}`}>
            <a>Ingredient Name</a>
          </li>
        </ul>
      </div>

      <div className="container">
        <div className="columns is-multiline is-mobile">
          {filterRecipes().map((recipe, index) => {
            return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <Link
                to={{ pathname: `/recipes/${recipe._id}`, state: searchData }}>
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
    </section >
  </main >
}

export default SearchResults