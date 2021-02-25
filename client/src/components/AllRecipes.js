import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'lodash'


const AllRecipes = ({ history }) => {
  const [recipeData, updateRecipeData] = useState([])
  const [searchData, updateSearchData] = useState('')
  const [loading, updateLoading] = useState(true)
  const [filterMenu, updateFilterMenu] = useState('All')
  const [dietFilter, updateDietFilter] = useState([])
  const [allergensFilter, updateAllergensFilter] = useState([])
  const [lifestyleFilter, updateLifestyleFilter] = useState([])
  const [checkBox, updateCheckbox] = useState({
    'Balanced': false,
    'High-Protein': false,
    'Low-Carb': false,
    'Low-Fat': false,
    'Sulfites': false,
    'FODMAP': false,
    'Gluten': false,
    'Wheat': false,
    'Shellfish': false,
    'Soy': false,
    'Eggs': false,
    'Milk': false,
    'Tree-Nuts': false,
    'Peanut-Free': false,
    'Tree-Nut-Free': false,
    'Sugar-Conscious': false,
    'Alcohol-Free': false,
    'Immuno-Supportive': false,
    'Vegetarian': false,
    'Vegan': false
  })

  // ! This is for the all recipe display
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


  // ! This is for the filtering part ----------------------------
  function handleSubmit(event) {
    event.preventDefault()
    try {
      history.push({ pathname: '/search', state: searchData })
    } catch (err) {
      console.log(err)
    }
  }

  // List of things for menu in arrays
  const dietArray = _.compact(_.uniq(recipeData.map(recipe => recipe.diet).flat()))
  const lifestyleArray = _.compact(_.uniq(recipeData.map(recipe => recipe.healthLabels).flat()))
  const allergensArray = _.compact(_.uniq(recipeData.map(recipe => recipe.allergens).flat()))


  function handleClickFilter(event) {

    const newCriteria = event.target.value

    updateCheckbox({ ...checkBox, [newCriteria]: event.target.checked })

    if (filterMenu === 'Diet' && event.target.checked) {
      updateDietFilter([...dietFilter, newCriteria])
    } else {
      const excludeNewCriteria = dietFilter.filter(criteria => criteria !== newCriteria)
      updateDietFilter(excludeNewCriteria)
    }
    if (filterMenu === 'Allergens' && event.target.checked) {
      updateAllergensFilter([...allergensFilter, newCriteria])
    } else {
      const excludeNewCriteria = allergensFilter.filter(criteria => criteria !== newCriteria)
      updateAllergensFilter(excludeNewCriteria)
    }
    if (filterMenu === 'Lifestyle' && event.target.checked) {
      updateLifestyleFilter([...lifestyleFilter, newCriteria])
    } else {
      const excludeNewCriteria = lifestyleFilter.filter(criteria => criteria !== newCriteria)
      updateLifestyleFilter(excludeNewCriteria)
    }
  }

  function filterRecipes() {
    if (filterMenu === 'All') {
      return recipeData
    }

    let filteredRecipes = [...recipeData]

    if (filterMenu === 'Diet' && dietFilter.length > 0) {
      filteredRecipes = recipeData.filter(recipe => {
        const currentCriterias = dietFilter.join('')
        return recipe.diet.some(diet => {
          return currentCriterias.includes(diet)
        })
      })
    }
    if (filterMenu === 'Allergens') {
      filteredRecipes = filteredRecipes.filter(recipe => {
        const currentCriterias = allergensFilter.join('')
        return recipe.allergens.every(allergen => {
          return !currentCriterias.includes(allergen)
        })
      })
    }
    if (filterMenu === 'Lifestyle' && lifestyleFilter.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => {
        const currentCriterias = lifestyleFilter.join('')
        return recipe.healthLabels.some(lifestyle => {
          return currentCriterias.includes(lifestyle)
        })
      })
    }
    return filteredRecipes
  }

  function resetFilters() {
    updateDietFilter([])
    updateAllergensFilter([])
    updateLifestyleFilter([])
    updateCheckbox({
      'Balanced': false,
      'High-Protein': false,
      'Low-Carb': false,
      'Low-Fat': false,
      'Sulfites': false,
      'FODMAP': false,
      'Gluten': false,
      'Wheat': false,
      'Shellfish': false,
      'Soy': false,
      'Eggs': false,
      'Milk': false,
      'Tree-Nuts': false,
      'Peanut-Free': false,
      'Tree-Nut-Free': false,
      'Sugar-Conscious': false,
      'Alcohol-Free': false,
      'Immuno-Supportive': false,
      'Vegetarian': false,
      'Vegan': false
    })
  }
  // ! End of the filtering part ----------------------------


  return <main>
    {/* Search Bar */}
    <section className="section">
      <h1 className="title">ALL RECIPES</h1>
      <h3 className="subtitle">SEARCH FOR A NEW RECIPE</h3>
      <div className="column">
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

    {/* Menu and Recipes */}
    <section className="section">
      <h3 className="subtitle">BROWSE RECIPES</h3>
      <p className="content">{filterRecipes().length} Recipes Available</p>
      <div className="columns">

        {/* Menu */}
        <section className="section">
          <div className="column">
            <nav className="panel">
              
              <p className="panel-heading">Filters</p>

              <p className="panel-tabs">
                <a onClick={event => {
                  resetFilters()
                  updateFilterMenu(event.target.innerHTML)
                }}
                className={filterMenu === 'All' ? 'is-active' : ''}>
                  All
                </a>
                <a onClick={event => {
                  resetFilters()
                  updateFilterMenu(event.target.innerHTML)
                }}
                className={filterMenu === 'Diet' ? 'is-active' : ''}>
                  Diet
                </a>
                <a onClick={event => {
                  resetFilters()
                  updateFilterMenu(event.target.innerHTML)
                }}
                className={filterMenu === 'Allergens' ? 'is-active' : ''}>
                  Allergens
                </a>
                <a onClick={event => {
                  resetFilters()
                  updateFilterMenu(event.target.innerHTML)
                }}
                className={filterMenu === 'Lifestyle' ? 'is-active' : ''}>
                  Lifestyle
                </a>
              </p>

              {filterMenu === 'All' && <label className="panel-block is-active">Pick a Category</label>}
              {filterMenu === 'Diet' &&
                dietArray.map((element, i) => {
                  return <label
                    key={i}
                    className="panel-block is-active">
                    <input
                      type="checkbox"
                      value={element}
                      onChange={handleClickFilter}
                      checked={checkBox[element]}
                    />
                    {element}
                  </label>
                })}
              {filterMenu === 'Lifestyle' &&
                lifestyleArray.map((element, i) => {
                  return <label
                    key={i}
                    className="panel-block is-active">
                    <input
                      type="checkbox"
                      value={element}
                      onChange={handleClickFilter}
                      checked={checkBox[element]}
                    />
                    {element}
                  </label>
                })}
              {filterMenu === 'Allergens' &&
                allergensArray.map((element, i) => {
                  return <label
                    key={i}
                    className="panel-block is-active">
                    <input
                      type="checkbox"
                      value={element}
                      onChange={handleClickFilter}
                      checked={checkBox[element]}
                    />
                    {element}
                  </label>
                })}


              <div className="panel-block">
                <button
                  className="button is-link is-outlined is-fullwidth"
                  onClick={resetFilters}>
                  Reset all filters</button>
              </div>
            </nav>
          </div>
        </section>

        {/* All Recipes*/}
        <section className="section">
          <div className="column">
            <div className="container">
              <div className="columns is-multiline is-mobile">
                {filterRecipes().map((recipe, index) => {
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
          </div>
        </section>

      </div>
    </section>
  </main >
}

export default AllRecipes


