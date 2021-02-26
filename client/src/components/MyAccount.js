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
  const [image, updateImage] = useState('')
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
        updateImage(data.image)
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
    slidesToShow: sliderStyles(postedRecipes),
    slidesToScroll: sliderStyles(postedRecipes),
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
          rows: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          rows: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1
        }
      }
    ]
  }

  const settingsSaved = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: sliderStyles(savedRecipes),
    slidesToScroll: sliderStyles(savedRecipes),
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
          rows: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          rows: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1
        }
      }
    ]
  }

  const sliderStyle = {
    height: '25%'
  }

  function recipesAdded(array) {
    if (array.length === 0) {
      return 'No recipes added yet 👨‍🍳`'
    }
  }

  function sliderStyles(array) {
    if (array.length < 5) {
      return array.length
    } else if (array.length >= 5) {
      return 3
    }
  }

  return <main className='is-flex accountContainer columns is-desktop'>
    <section className='container column is-two-thirds'>
      <div className='container'>
        <img className='profilePic' src={image} />
        <h1 className='title is-2' id="myaccount">{name}'s Recipes</h1>
      </div>
      <UpdateProfileModal />
      <div>
        <h2 className='title is-4'>Saved Recipes</h2>
        <span>{recipesAdded(savedRecipes)}</span>
        <hr />
        <Slider {...settingsSaved} style={sliderStyle}>
          {savedRecipes.map(saved => {
            return <Link key={saved._id} to={`/recipes/${saved._id}`}>
              <img className='slideImage' src={saved.image} alt={saved.recipeName} />
              <h5 className="title is-5">{saved.recipeName.length >= 12 ? saved.recipeName.slice(0, 15) + '....' : saved.recipeName}</h5>
            </Link>
          })}
        </Slider>
      </div>
      <div>
        <h2 className='title is-4' style={{ paddingTop: '30px' }}>Posted Recipes</h2>
        <span>{recipesAdded(postedRecipes)}</span>
        <hr />
        <Slider {...settingsPosted} style={sliderStyle}>
          {postedRecipes.map(posted => {
            return <Link key={posted._id} to={`/recipes/${posted._id}`}>
              <img className='slideImage' src={posted.image} alt={posted.recipeName} />
              <h5 className="title is-5">{posted.recipeName.length >= 12 ? posted.recipeName.slice(0, 15) + '....' : posted.recipeName}</h5>
            </Link>
          })}
        </Slider>
      </div>
    </section>
    {/* <button className='is-button'>Add a recipe</button> */}
    <section className='level column is-one-third suggested'>
      <h2 className='level-item title is-4'>Suggested Recipes</h2>
      <GetSuggested />
    </section>
  </main>
}