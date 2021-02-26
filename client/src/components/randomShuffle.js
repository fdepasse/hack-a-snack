import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'


export default function ShuffleCarousel() {
  const [recipeData, updateRecipeData] = useState([])
  const [loading, updateLoading] = useState(true)
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
    slidesToShow: 4,
    slidesToScroll: 5,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const sliderStyle = {
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
            <h5 className="title is-6 pt-3">{recipe.recipeName}</h5>
          </Link>
        })}
      </Slider>
    </div>
  </main>
}