import React from 'react'
import { useState, useEffect } from 'react'
// import Slider from 'react-slick'
// import axios from 'axios'

export default function myAccount() {
  const [popular, updatePopular] = useState([])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  }

  return <main className='is-flex'>
    <section className='column is-two-thirds'>
      <h1 className='title is-2'>My Account</h1>
      <h2 className='title is-4'>Saved Recipes</h2>
      <div>
        <h2> Multiple items </h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
        </Slider>
      </div>
      <h2 className='title is-4'>Posted Recipes</h2>
      <button className='is-button'>Edit my account</button>
      <button className='is-button'>Add a recipe</button>

    </section>
    <section className='column is-one-third'>
      <h2 className='title is-4'>Suggested Recipes</h2>
    </section>




  </main>
}