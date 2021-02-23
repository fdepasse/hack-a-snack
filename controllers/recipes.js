import Recipes from '../models/recipeSchema.js'
import User from '../models/userSchema.js'

async function getRecipes(_req, res, next) {
  try {
    const recipeList = await Recipes.find().populate('user').populate('comments.user')
    res.status(200).send(recipeList)
  } catch (err) {
    next(err)
  }
}

async function getSingleRecipe(req, res, next) {
  const id = req.params.recipeId
  try {
    const recipe = await Recipes.findById(id).populate('user').populate('comments.user')
    console.log(id)
    res.status(201).send(recipe)
  } catch (err) {
    console.log(err)
    next(err)
    console.log(err)
  }
}

async function makeRecipe(req, res, next) {
  const body = req.body
  body.user = req.currentUser

  try {
    const newRecipe = await Recipes.create(body)
    const user = await User.findById(body.user)
    user.postedRecipes.push(newRecipe)
    await user.save()
    res.status(201).send(newRecipe)
  } catch (err) {
    next(err)
  }
}

async function getRecipesByUser(req, res, next) {
  const user = req.params
  try {
    const userRecipe = await Recipes.find(user).populate('user').populate('comments.user')
    res.status(201).send(userRecipe)
  } catch (err) {
    next(err)
  }
}

async function updateRecipe(req, res, next) { //tested without secureRoute enabled on router -> need to retest user permissions
  const id = req.params.recipeId
  // console.log('the id inside update is: ' + id)
  const currentUser = req.currentUser
  const body = req.body

  try {
    const recipeToUpdate = await Recipes.findById(id)
    //check if there's actually a recipe 
    if (!recipeToUpdate) {
      return res.send({ message: 'No recipe found' })
    }
    // check the user is the one who created the recipe || my main man masterchef
    if (!currentUser.isAdmin && !recipeToUpdate.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    recipeToUpdate.set(body)
    recipeToUpdate.save()
    res.send(recipeToUpdate)

  } catch (err) {
    console.log(err)
    next()
  }

}

async function deleteRecipe(req, res, next) { //tested without secureRoute enabled on router -> need to retest user permissions
  const id = req.params.recipeId
  const currentUser = req.currentUser

  try {

    const recipeToDelete = await Recipes.findById(id)//add populate user and comments user here?

    //check if there's actually a recipe 
    if (!recipeToDelete) {
      return res.send({ message: 'No recipe found' })
    }
    // check the user is the one who created the recipe || my main man masterchef
    if (!currentUser.isAdmin && !recipeToDelete.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await recipeToDelete.deleteOne()

    res.send(recipeToDelete)

  } catch (err) {
    console.log('ERROR:', err)
    next()
  }
}

async function getRandomRecipe(_req, res, next) {
  try {
    const recipeList = await Recipes.find().populate('user').populate('comments.user')

    const randomIndex = Math.floor(Math.random() * recipeList.length)

    const randomRecipe = recipeList[randomIndex]

    res.status(200).send(randomRecipe)

  } catch (err) {
    next(err)
  }
}

async function searchRecipe(req, res, next) {
  const searchData = req.query.q

  try {
    const recipeList = await Recipes.find({ $text: { $search: `"${searchData}"` } }).populate('user').populate('comments.user')

    console.log(recipeList)
    res.status(200).send(recipeList)

  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default {
  getRecipes,
  updateRecipe,
  deleteRecipe,
  getSingleRecipe,
  makeRecipe,
  getRecipesByUser,
  getRandomRecipe,
  searchRecipe
}