import Recipes from '../models/recipeSchema.js'
import User from '../models/userSchema.js'

async function starredRecipes(req, res, next) {
  //get the recipe id from the request 
  const userId = req.currentUser
  const recipeId = req.params.recipeId


  try {
    const thisRecipe = await Recipes.findById(recipeId)

    if (!thisRecipe) {
      return res.status(404).send('Recipe not found')
    }

    const user = await User.findById(userId).populate('savedRecipes')

    if (!user) {
      return res.status(404).send('User not found')
    }

    user.savedRecipes.push(thisRecipe)

    const savedUser = await user.save()
    res.status(201).send(savedUser)

  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function unstarredRecipes(req, res, next) {
  //get the recipe id from the request 
  const userId = req.currentUser
  const recipeId = req.params.recipeId

  try {
    const user = await User.findById(userId).populate('savedRecipes')

    if (!user) {
      return res.status(404).send('User not found')
    }

    const selectedStarredRecipe = await user.savedRecipes.id(recipeId)

    if (!selectedStarredRecipe) {
      return res.status(404).send('Recipe not found')
    }

    selectedStarredRecipe.remove()

    const savedUser = await user.save()
    
    res.send(savedUser)

  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default {
  starredRecipes,
  unstarredRecipes
}