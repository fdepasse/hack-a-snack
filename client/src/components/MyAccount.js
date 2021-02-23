import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

export default function myAccount({ match }) {

  // const token = localStorage.getItem('token')
  //headers: { Authorization: `Bearer ${token}` }

  const [savedRecipes, updateSaved] = useState([])
  const [postedRecipes, updatePosted] = useState([])
  const userId = match.params
  console.log('userId =' + userId)//need to get an actual id out here

  useEffect(() => {
    async function getUserRecipes() {
      try {
        const { data } = await axios.get(`/api/user/6034e770756bec3bc3697d80`, {//need to update this dynamically
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDM0ZTc3MDc1NmJlYzNiYzM2OTdkODAiLCJpYXQiOjE2MTQwODI5MDEsImV4cCI6MTYxNDEyNjEwMX0.bkVhutTKUT3cbOJZLNPk8Nsk8oHROVzuRPriL4snCPc` }
        })
        updatePosted(data.postedRecipes)
        updateSaved(data.savedRecipes)
      } catch (err) {
        console.log(err)
      }
    }
    getUserRecipes()
  }, [])

  // console.log(savedRecipes)
  // console.log(postedRecipes)

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


  return <main className='is-flex'>
    <section className='column is-two-thirds'>
      <h1 className='title is-2'>My Account</h1>
      <button className='button is-danger is-rounded'>💡 Edit my account</button>
      <div>
        <h2 className='title is-4'>Saved Recipes</h2>
        <Slider {...settings} style={sliderStyle}>
          {savedRecipes.map(saved => {
            return <Link key={saved._id} to={`/recipes/${saved._id}`}>
              <img src={saved.image} alt={saved.recipeName} />
            </Link>
          })}
        </Slider>
      </div>
      <div>
        <h2 className='title is-4'>Posted Recipes</h2>
        <Slider {...settings} style={sliderStyle}>
          {postedRecipes.map(posted => {
            return <Link key={posted._id} to={`/recipes/${posted._id}`}>
              <img src={posted.image} alt={posted.recipeName} />
            </Link>
          })}
        </Slider>
      </div>
    </section>
    {/* <button className='is-button'>Add a recipe</button> */}
    <section className='column is-one-third'>
      <h2 className='title is-4'>Suggested Recipes</h2>
    </section>




  </main>
}