import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function GetSuggested() {
  const [loading, updateLoading] = useState(true)
  const [suggestedRecipes, updateSuggestedRecipes] = useState([])

  async function getSuggestedRecipes(suggestedArray) {
    try {
      const { data } = await axios.get('/api/random-recipe')
      suggestedArray.push(data)//pushes the recipe to the Array 
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    async function randomRecipe() {
      let suggestedArray = []
      for (let i = 0; i <= 2; i++) {
        await getSuggestedRecipes(suggestedArray)//calls the func x 5
        //add some code here to check if we already have the recipe in the array 
        if (i === 2) {
          console.log(suggestedArray)
          updateSuggestedRecipes([...suggestedArray])
          updateLoading(false)//as soon as i get to 5 we'll change loading to true as we now have the data to display
        }
      }
    }
    randomRecipe()
  }, [])

  if (loading) {
    return <h1 className="subtitle">Loading...</h1>
  }

  return <div className='suggestedImgs'>
    {suggestedRecipes.map(recipe => {
      return <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
        <div >
          <img key={recipe._id} className='slideImage' src={recipe.image} alt={recipe.recipeName} />
          <h5 className="title is-5">{recipe.recipeName.length >= 12 ? recipe.recipeName.slice(0, 15) + '....' : recipe.recipeName}</h5>
        </div>
      </Link>
    })}
  </div>
}
