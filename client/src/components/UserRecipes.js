import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

export default function UserRecipes(props) {
  const userId = props.match.params.user
  const [savedRecipes, updateSaved] = useState([])
  const [postedRecipes, updatePosted] = useState([])
  const [name, updateName] = useState('')
  const [loading, updateLoading] = useState(true)

  useEffect(() => {
    async function getUserRecipes() {
      try {
        const { data } = await axios.get(`/api/user/${userId}`, {
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
      return `No recipes added yet 🥗`
    }
  }

  return <main className='column accountContainer'>
    <h1 className='title is-2 has-text-centered'>{name}'s Recipes</h1>
    <div>
      <h2 className='title is-4'>Saved Recipes</h2>
      <span>{recipesAdded(savedRecipes)}</span>
      <hr />
      <Slider {...settingsSaved} style={sliderStyle}>
        {savedRecipes.map(saved => {
          return <Link key={saved._id} to={`/recipes/${saved._id}`}>
            <img className='slideImage' src={saved.image} alt={saved.recipeName} />
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
          </Link>
        })}
      </Slider>
    </div>
  </main>
}