import Recipes from '../models/recipeSchema.js'

async function getRecipes(_req, res, next) {
  try {
    const recipeList = await Recipes.find().populate('user').populate('comments.user')
    res.status(201).send(recipeList)
  } catch (err) {
    next(err)
  }
}

async function getSingleRecipe(req, res, next) {
  const id = req.params.id
  try {
    const recipe = await Recipes.findById(id).populate('user').populate('comments.user')
    res.status(201).send(recipe)
  } catch (err) {
    next(err)
  }
}

async function makeRecipe(req, res, next) {
  const body = req.body
  body.user = req.currentUser

  try {
    const newRecipe = await Recipes.create(body)
    res.status(201).send(newRecipe)
  } catch (err) {
    next(err)
  }
}

async function getRecipesByUser(req, res, next) {
  const user = req.params
  console.log(req.params)
  try {
    const userRecipe = await Recipes.find(user).populate('user').populate('comments.user')
    res.status(201).send(userRecipe)
  } catch (err) {
    next(err)
  }
}

export default {
  getRecipes,
  getSingleRecipe,
  makeRecipe,
  getRecipesByUser
}