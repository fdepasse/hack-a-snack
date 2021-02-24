import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

export default function ShuffleCarousel() {
  const [recipeData, updateRecipeData] = useState([])
  const [loading, updateLoading] = useState(true)

  // const promises = []

  // async function getMoreRecipes() {

  //   for (let i = 0; i <= 9; i++) {
  //     const timeoutNumber = 50 * i
  //     promises.push(new Promise((resolve) => {
  //       setTimeout(() => {
  //         axios.get('/api/random-recipe')
  //           .then(({ data }) => {
  //             const randomRecipe = {
  //               id: data._id,
  //               image: data.image,
  //             }
  //             resolve(randomRecipe)
  //           })

  //       }, timeoutNumber)
  //     }))
  //     // promises.push(recipeData)
  //     // console.log(recipeData)
  //   }
  //   return Promise.all(promises).then((values) =>{
  //     updateRecipeData(values)
  //     updateLoading(false)

  //   })

  // }

  // useEffect(async () => {
  //   await getMoreRecipes()
  // }, [])

  const dataArray = []

//getting one random recipe
  async function getThoseRecipes() {
    try {
      const { data } = await axios.get('/api/random-recipe')
      dataArray.push(data)//pushes the recipe to the dataArray 
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { 
    for (let i = 0; i <= 9; i++) {
      getThoseRecipes()//calls the func x 9
      //add some code here to check if we already have the recipe in the array STRETCH 
      if (i === 9) {
        updateRecipeData(dataArray)
        updateLoading(false)//as soon as i gets to 9 we'll change loading to true as we now have the data to display
      }
    }
  }, [])

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
  }

  const sliderStyle = {
    // width: '66vw',
    height: '25%',
  }
  if (loading) {
    return <h1 className="subtitle">Loading...</h1>
  }

  return <main>
    <div>
      <Slider {...settings} style={sliderStyle}>
        {recipeData.map((recipe, index) => {
          return <Link key={index} to={`/recipes/${recipe._id}`}>
            <img className='slideImage' src={recipe.image} alt={recipe.recipeName} />
          </Link>
        })}
      </Slider>
    </div>
  </main>
}