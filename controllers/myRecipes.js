import Recipes from '../models/recipeSchema.js'
import User from '../models/userSchema.js'

async function starredRecipes(req, res, next) {
  //get the recipe id from the request 
  const userId = req.currentUser
  const recipeId = req.params.recipeId
  console.log(recipeId)
  try {
    const thisRecipe = await Recipes.findById(recipeId)
    const user = await User.findById(userId)

    //push the recipe id to the array of recipes on the user 
    User.savedRecipes.push(recipeId)
    const savedUser = await User.save()
    res.send(savedUser)
    // console.log(User.savedRecipes)

  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function unstarredRecipes(req, res, next) {
  //get the recipe id from the request 
  const userId = req.currentUser
  const recipeId = req.params.recipeId
  console.log(recipeId)
  try {
    const thisRecipe = await Recipes.findById(recipeId)
    const user = await User.findById(userId)

    const selectedStarredRecipe = await User.savedRecipes.id(recipeId)

    selectedStarredRecipe.remove()
    const savedUser = await User.save()
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