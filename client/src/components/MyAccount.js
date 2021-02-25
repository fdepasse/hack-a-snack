import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from './lib/auth'
import UpdateProfileModal from './UpdateProfile'
import GetSuggested from './SuggestedRecipes'

export default function myAccount({ match }) {
  const [savedRecipes, updateSaved] = useState([])
  const [postedRecipes, updatePosted] = useState([])
  const [name, updateName] = useState('')
  const [loading, updateLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function getUserRecipes() {
      try {
        const { data } = await axios.get(`/api/user/${getLoggedInUserId()}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        updatePosted(data.postedRecipes)
        updateSaved(data.savedRecipes)
        updateName(data.username)
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

  const settingsPosted = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: postedRecipes.length,
    slidesToScroll: postedRecipes.length,
    autoplay: true,
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          rows: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          rows: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        }
      }
    ]
  }

  const settingsSaved = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: savedRecipes.length,
    slidesToScroll: 5,
    autoplay: true,
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          rows: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          rows: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        }
      }
    ]
  }

  const sliderStyle = {
    height: '25%',
  }

  function recipesAdded(array) {
    if (array.length === 0) {
      return `No recipes added yet 👨‍🍳`
    }
  }

  return <main className='is-flex accountContainer columns is-desktop'>
    <section className='column is-two-thirds'>
      <h1 className='title is-2 has-text-centered'>{name}'s Recipes</h1>
      {/* <EditRecipeModal /> */}
      <UpdateProfileModal />
      <div>
        <h2 className='title is-4'>Saved Recipes</h2>
        <span>{recipesAdded(savedRecipes)}</span>
        <hr />
        <Slider {...settingsSaved} style={sliderStyle}>
          {savedRecipes.map(saved => {
            return <Link key={saved._id} to={`/recipes/${saved._id}`}>
              <img className='slideImage' src={saved.image} alt={saved.recipeName} />
              <h5 className="title is-5">{saved.recipeName}</h5>
            </Link>
          })}
        </Slider>
      </div>
      <div>
        <h2 className='title is-4'>Posted Recipes</h2>
        <span>{recipesAdded(postedRecipes)}</span>
        <hr />
        <Slider {...settingsPosted} style={sliderStyle}>
          {postedRecipes.map(posted => {
            return <Link key={posted._id} to={`/recipes/${posted._id}`}>
              <img className='slideImage' src={posted.image} alt={posted.recipeName} />
              <h5 className="title is-5">{posted.recipeName}</h5>
            </Link>
          })}
        </Slider>
      </div>
    </section>
    {/* <button className='is-button'>Add a recipe</button> */}
    <section className='column is-one-third suggested'>
      <h2 className='title is-4'>Suggested Recipes</h2>
      <GetSuggested />
    </section>
  </main>
}