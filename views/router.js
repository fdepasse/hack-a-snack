import express from 'express'
import recipes from '../controllers/recipes.js'
import comment from '../controllers/comment.js'
import myRecipes from '../controllers/myRecipes.js'
import user from '../controllers/user.js'

const router = express.Router()

import secureRoute from '../middleware/secureRoute.js'

// router.route('/register')
//   .post(user.register)

router.route('/login')
  .post(user.login)

router.route('/recipes')
  .get(recipes.getRecipes)
  .post(secureRoute, recipes.makeRecipe)

router.route('/recipes/:id')
  .get(recipes.getSingleRecipe)
//   .put(secureRoute, recipes.updateRecipe)
//   .delete(secureRoute, recipes.deleteRecipe)

router.route('/recipes/user/:user')
  .get(recipes.getRecipesByUser)

// router.route('/user/:userId')
//   .get(secureRoute, user.getUser)
//   .put(secureRoute, user.updateProfile)

// router.route('/myRecipes/:recipeId')
//   .put(secureRoute, myRecipes.starredRecipes)
//   .delete(secureRoute, myRecipes.unstarredRecipes)

// router.route('/recipes/:recipeId/comment')
//   .post(secureRoute, comment.makeComment)

// router.route('/recipes/recipeId/comment/:commentId')
//   .put(secureRoute, comment.updateComment)
//   .delete(secureRoute, comment.deleteComment)

export default router