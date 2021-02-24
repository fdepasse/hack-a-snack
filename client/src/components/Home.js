import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Slider from 'react-slick'

const Home = ({ history }) => {
  const [recipeData, updateRecipeData] = useState({})
  const [searchData, updateSearchData] = useState('')
  // const [randomRecipes, updateRandomRecipes] = useState([])
  // const promises = []

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

  // function shuffleRecipes() {
  //   for (let i = 0; i <= 10; i++) {
  //     axios.get('/api/random-recipe')
  //       .then(({ data }) => {
  //         updateRandomRecipes(data)
  //       })
  //     promises.push(randomRecipes)
  //   }
  // }
  // shuffleRecipes()

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 6,
  //   slidesToScroll: 6,
  //   autoplay: true
  // }

  // const sliderStyle = {
  //   width: '100vh',
  //   height: '25%',
  // }

  return <main>
    <div className="columns is-centered is-multiline">
      <section className="section">
        <div className="column">
          <h2 className="title">WHY NOT TRY...</h2>
          <Link className="card" to={`/recipes/${recipeData._id}`}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={recipeData.image} alt={recipeData.recipeName} style={{ borderRadius: '12px' }}/>
              </figure>
            </div>
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{recipeData.recipeName}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="column">
          <h1 className="title">WELCOME TO STRESSIPE</h1>
          <h3 className="subtitle">SEARCH FOR A NEW RECIPE</h3>
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
    </div>
    {/* <section className="section">
      <Slider {...settings} style={sliderStyle}>
        {promises.map(recipe => {
          return <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
            <img className='slideImage' src={recipe.image} alt={recipe.recipeName} />
          </Link>
        })}
      </Slider>
    </section> */}
  </main>
}

export default Home