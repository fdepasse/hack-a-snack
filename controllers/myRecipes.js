import Recipes from '../models/recipeSchema.js'
import User from '../models/userSchema.js'

async function starredRecipes(req, res, next) {
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

    const savedRecipes = await user.savedRecipes

    const recipeIndex = (savedRecipes.findIndex(function (recipe) {
      return String(recipe._id) === String(recipeId)
    }))

    // if (recipeIndex) {
    //   return res.status(403).send('Recipe already saved')
    // }

    user.savedRecipes.push(thisRecipe)

    const savedUser = await user.save()
    res.status(201).send(savedUser)

  } catch (err) {
    next(err)
  }
}


async function unstarredRecipes(req, res, next) {
  const userID = req.currentUser
  const recipeId = req.params.recipeId

  try {
    const user = await User.findById(userID).populate('savedRecipes')

    if (!user) {
      return res.status(404).send('User not found')
    }

    const savedRecipes = await user.savedRecipes

    const recipeIndex = (savedRecipes.findIndex(function (recipe) {
      return String(recipe._id) === String(recipeId)
    }))

    // if (!recipeIndex) {
    //   return res.status(404).send('Recipe not found')
    // }

    savedRecipes.splice(recipeIndex, 1)

    const savedUser = await user.save()

    res.send(savedUser)

  } catch (err) {
    next(err)
  }
}

export default {
  starredRecipes,
  unstarredRecipes
}