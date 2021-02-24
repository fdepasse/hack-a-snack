import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

export default function ShuffleCarousel() {
  const [recipeData, updateRecipeData] = useState([{}])

  const promises = []

  async function getRandomRecipes() {
    useEffect(() => {
      for (let i = 0; i <= 9; i++) {
        const { data } =  axios.get('/api/random-recipe')
        promises.push(data)

        // promises.push(recipeData)
        // console.log(recipeData)
      }
      updateRecipeData(promises)
    }, [])

  }
  getRandomRecipes()

  // useEffect(() => {
  //   async function getRandomRecipes() {
  //     let promises = []
  //     try {
  //       const { data } = await axios.get('/api/random-recipe')
  //       promises.push(data)
  //       updateRecipeData(promises)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getRandomRecipes()
  // }, [])




  // console.log('recipeData', recipeData)
  console.log('promises', promises)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    vertical: true,
  }

  const sliderStyle = {
    // width: '66vw',
    height: '25%',
  }

  return <main>
    <div>
      <Slider {...settings} style={sliderStyle}>
        {recipeData.map(recipe, index => {
          return <Link key={index} to={`/recipes/${recipe._id}`}>
            <img className='slideImage' src={recipe.image} alt={recipe.recipeName} />
          </Link>
        })}
      </Slider>
    </div>
  </main>
}