import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from './lib/auth'
import ShuffleCarousel from './randomShuffle'
import UpdateProfileModal from './UpdateProfile'

export default function myAccount({ match, history }) {
  const token = localStorage.getItem('token')
  const [savedRecipes, updateSaved] = useState([])
  const [postedRecipes, updatePosted] = useState([])
  const [loading, updateLoading] = useState(true)

  useEffect(() => {
    async function getUserRecipes() {
      try {
        const { data } = await axios.get(`/api/user/${getLoggedInUserId()}`, {
          headers: { Authorization: `Bearer ${token}` }
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
  
  // console.log(savedRecipes)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true
  }

  const sliderStyle = {
    // width: '66vw',
    height: '25%',
  }
  // console.log(postedRecipes)


  return <main className='is-flex'>
    <section className='column is-two-thirds'>
      <h1 className='title is-2'>My Account</h1>
      <UpdateProfileModal history={history} />
      <div>
        <h2 className='title is-4'>Saved Recipes</h2>
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
        <Slider {...settings} style={sliderStyle}>
          {postedRecipes.map(posted => {
            return <Link key={posted._id} to={`/recipes/${posted._id}`}>
              <img className='slideImage' src={posted.image} alt={posted.recipeName} />
            </Link>
          })}
        </Slider>
      </div>
    </section>
    {/* <button className='is-button'>Add a recipe</button> */}
    <section className='column is-one-third'>
      <h2 className='title is-4'>Suggested Recipes</h2>
      <ShuffleCarousel />
    </section>
  </main>
}