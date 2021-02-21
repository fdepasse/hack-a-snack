import express from 'express'
import recipes from '../controllers/recipes.js'
import reviews from '../controllers/reviews.js'
import myRecipes from '../controllers/myRecipes.js'
import user from '../controllers/user.js'

const router = express.Router()

import secureRoute from '../middleware/secureRoute.js'

router.route('/register')
  .post(user.register)

router.route('/login')
  .post(user.login)

router.route('/recipes')
  .get(recipes.getRecipes)
  .post(secureRoute, recipes.makeRecipe)

router.route('/recipes/:recipeId')
  .get(recipes.getSingleRecipe)
  .put(secureRoute, recipes.updateRecipe)
  .delete(secureRoute, recipes.deleteRecipe)

router.route('/recipes/user/:user')
  .get(recipes.getRecipesByUser)

router.route('/user/:userId')
  .get(secureRoute, user.getUser)
  .put(secureRoute, user.updateProfile)

router.route('/myRecipes/:recipeId')
  .put(secureRoute, myRecipes.starredRecipes)
  .delete(secureRoute, myRecipes.unstarredRecipes)

router.route('/recipes/:recipeId/review/:reviewId')
  .put(secureRoute, reviews.updateReview)
  .delete(secureRoute, reviews.deleteReview)

router.route('/recipes/:recipeId/review')
  .post(secureRoute, reviews.postReview)



export default router