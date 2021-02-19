import Recipes from '../models/recipeSchema.js'


async function getRecipes(_req, res, next) {
  try {
    const recipes = await Recipes.find()
    res.status(201).send(recipes)
  } catch (err) {
    next(err)
  }
}

export default {
  getRecipes
}