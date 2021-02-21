import Recipes from '../models/recipeSchema.js'
import User from '../models/userSchema.js'

async function starredRecipes(req, res, next) {
  const userId = req.currentUser
  const recipeId = req.params.recipeId
  try {
    const thisRecipe = await Recipes.findById(recipeId)
    const user = await User.findById(userId)

    if (!thisRecipe) {
      return res.send({ message: 'No recipe found' })
    }

    user.savedRecipes.push(thisRecipe)
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function unstarredRecipes(req, res, next) {
  //get the recipe id from the request 
  const userId = req.currentUser
  // const recipeId = req.params.recipeId
  const recipeId = req.params
  try {
    const user = await User.findById(userId).populate('savedRecipes')

    const selectedStarredRecipe = await user.savedRecipes.id(recipeId)
    //tofind the recipe in the user array 
    //.id() is supposed to find something that you've stored in an array on your schema look in the arrya by the id
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