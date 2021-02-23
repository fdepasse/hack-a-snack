import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SearchResults = ({ location }) => {
  const [recipeData, updateRecipeData] = useState([])
  const [searchData, updateSearchData] = useState(location.state)
  // const [filterSelected, updateFilterSelected] = useState('All')

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
    } catch (err) {
      console.log(err)
    }
  }


  // function toggleFilterClass(){


  // }

  // function filterResults() {
  //   return recipeData.filter(recipe => {
  //     if (filterSelected === 'All') {
  //       return recipeData
  //     } else {
  //       recipe.recipeName.toLowerCase().includes(searchData.toLowerCase())
  //     }
  //   })
  // }

  return <main>

    <section className="section">
      <div className="column">
        <h1 className="title">Results</h1>
        <h3 className="subtitle">{`${recipeData.length} recipes found`}</h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                onChange={(event) => updateSearchData(event.target.value)}
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
        <h4 className="subtitle">Show Results by:</h4>
      </div>

      <div className="tabs is-boxed">
        <ul>
          <li /*</ul>className={filterSelected === 'All' ? 'is-active' : '' }*/> <a>All</a></li>
          <li /*className={filterSelected === 'recipeName' ? 'is-active' : '' }onClick={event => updateFilterSelected(event.target.id)}*/><a id="recipeName">Recipe Name</a></li>
          <li><a value="ingredients">Ingredient Name</a></li>
        </ul>
      </div>

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

export default SearchResults