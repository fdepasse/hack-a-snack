import Recipes from '../models/recipeSchema.js'


async function getRecipes(_req, res, next) {
  try {
    const recipes = await Recipes.find()
    res.status(201).send(recipes)
  } catch (err) {
    next(err)
  }
}

async function updateRecipe(req, res, next) { //tested without secureRoute enabled on router -> need to retest user permissions
  const id = req.params.id
  console.log('the id inside update is: ' + id)
  const currentUser = req.currentUser
  const body = req.body

  try {
    const recipeToUpdate = await Recipes.findById(id)
    //check if there's actually a recipe 
    if (!recipeToUpdate) {
      return res.send({ message: 'No recipe found' })
    }
    // check the user is the one who created the recipe || my main man masterchef
    // if (!currentUser.isAdmin && !recipeToUpdate.user.equals(currentUser._id)){
    //   return res.status(401).send({ message: 'Unauthorized' })
    // }
    recipeToUpdate.set(body)
    recipeToUpdate.save()
    res.send(recipeToUpdate)

  } catch (err) {
    console.log(err)
    next()
  }

}

async function deleteRecipe(req, res, next) { //tested without secureRoute enabled on router -> need to retest user permissions
  const id = req.params.id
  const currentUser = req.currentUser

  try {

    const recipeToDelete = await Recipes.findById(id)//add populate user and comments user here?
 
    //check if there's actually a recipe 
    if (!recipeToDelete) {
      return res.send({ message: 'No recipe found' })
    }
    // check the user is the one who created the recipe || my main man masterchef
    // if (!currentUser.isAdmin && !recipeToDelete.user.equals(currentUser._id)){
    //   return res.status(401).send({ message: 'Unauthorized' })
    // }
    await recipeToDelete.deleteOne()

    res.send(recipeToDelete)

  } catch (err) {
    console.log(err)
    next()
  }

}

export default {
  getRecipes,
  updateRecipe,
  deleteRecipe
}