import React from 'react'
import { useState, useEffect } from 'react'
<<<<<<< HEAD
import Slider from 'react-slick'

=======
// import Slider from 'react-slick'
>>>>>>> development
// import axios from 'axios'

export default function myAccount() {
  const [saved, updateSaved] = useState([])

 const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true
  }

  const sliderStyle = {
    width: '100vw',
    height: '25%',
    position: 'fixed',
    bottom: '0',
    'background-color': 'hsl(348, 100%, 61%)'
  }



  return <main className='is-flex'>
    <section className='column is-two-thirds'>
      <h1 className='title is-2'>My Account</h1>
      <h2 className='title is-4'>Saved Recipes</h2>
      <div>
        <h2> Multiple items </h2>
        {/* <Slider {...settings}>
          <div>
            <h3>1</h3>
            <img src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'></img>
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
        </Slider> */}
      </div>
      <h2 className='title is-4'>Posted Recipes</h2>
      <button className='is-button is-rounded'>Edit my account</button>
      <button className='is-button is-rounded'>Add a recipe</button>

    </section>
    <section className='column is-one-third'>
      <h2 className='title is-4'>Suggested Recipes</h2>
    </section>




  </main>
}