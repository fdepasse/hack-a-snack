import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [recipeData, updateRecipeData] = useState([])

  useEffect(() => {
    axios.get('/api/random-recipe')
      .then(({ data }) => {
        updateRecipeData(data)
      })
  }, [])


  return <main>

    <div className="columns">

      <section className="section">
        <div className="column">
          <h2 className="title">WHY NOT TRY...</h2>
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={recipeData.image} alt={recipeData.recipeName} />
              </figure>
            </div>
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{recipeData.recipeName}</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="section">
        <div className="column">
          <h1 className="title">WELCOME TO STRESSIPE</h1>
          <h3 className="subtitle">SEARCH FOR A NEW RECIPE</h3>
          <input className="input" type="text" placeholder="Enter search here" />
        </div>
      </section>

    </div>


    <section className="section">Carousel</section>


  </main>
}

export default Home