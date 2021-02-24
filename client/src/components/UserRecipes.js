import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

export default function UserRecipes(props) {
  console.log('props',props)
  const userId = props.match.params.user
  // console.log(recipe.user.username)
  const [savedRecipes, updateSaved] = useState([])
  const [postedRecipes, updatePosted] = useState([])
  const [loading, updateLoading] = useState(true)

  useEffect(() => {
    async function getUserRecipes() {
      try {
        const { data } = await axios.get(`/api/user/${userId}`, {
        })
        updatePosted(data.postedRecipes)
        updateSaved(data.savedRecipes)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getUserRecipes()
  }, [])

  if (loading) {
    return <h1 className="subtitle">Loading...</h1>
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true
  }

  const sliderStyle = {
    width: '100vw',
    height: '25%',
  }


  return <main className='column accountContainer'>
    <h1 className='title is-2'>User Profile</h1>
    <div>
      <h2 className='title is-4'>Saved Recipes</h2>
      <hr/>
      <Slider {...settings} style={sliderStyle}>
        {savedRecipes.map(saved => {
          return <Link key={saved._id} to={`/recipes/${saved._id}`}>
            <img className='slideImage' src={saved.image} alt={saved.recipeName} />
          </Link>
        })}
      </Slider>
    </div>
    <div>
      <h2 className='title is-4'>Posted Recipes</h2>
      <hr/>
      <Slider {...settings} style={sliderStyle}>
        {postedRecipes.map(posted => {
          return <Link key={posted._id} to={`/recipes/${posted._id}`}>
            <img className='slideImage' src={posted.image} alt={posted.recipeName} />
          </Link>
        })}
      </Slider>
    </div>
  </main>
}