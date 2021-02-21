import Recipes from '../models/recipeSchema.js'

async function postReview(req, res, next) {
  const reviewData = req.body
  const currentUser = req.currentUser
  reviewData.user = currentUser
  const recipeId = req.params.recipeId


  try {
    const selectedRecipe = await Recipes.findById(recipeId).populate('review.user').populate('user')

    if (!selectedRecipe) (
      res.status(404).send({ message: 'Recipe Not Found' })
    )

    // console.log('selectedRecipe' + selectedRecipe)
    // console.log('reviewdata' + reviewData)
    // console.log('review =' + review)
    

    selectedRecipe.review.push(reviewData)

    const savedRecipe = await selectedRecipe.save()

    res.status(201).send(savedRecipe)

  } catch (err) {
    next(err)
  }
}

async function updateReview(req, res, next) {
  const reviewData = req.body
  const { recipeId, reviewId } = req.params
  const currentUser = req.currentUser

  try {
    const selectedRecipe = await Recipes.findById(recipeId).populate('review.user').populate('user')

    if (!selectedRecipe) {
      res.status(404).send({ message: 'Recipe Not Found' })
    }

    const selectedReview = await selectedRecipe.review.id(reviewId)

    if (!selectedReview) {
      res.status(404).send({ message: 'Review Not Found' })
    }

    if (!currentUser._id.equals(selectedReview.user._id)) {
      res.status(401).send({ message: 'Unauthorized' })
    }

    selectedReview.set(reviewData)

    const savedRecipe = await selectedRecipe.save()

    res.status(201).send(savedRecipe)

  } catch (err) {
    next(err)
  }
}

async function deleteReview(req, res, next) {
  const { recipeId, reviewId } = req.params
  const currentUser = req.currentUser

  try {
    const selectedRecipe = await Recipes.findById(recipeId).populate('review.user').populate('user')

    if (!selectedRecipe) {
      res.status(404).send({ message: 'Recipe Not Found' })
    }

    const selectedReview = await selectedRecipe.review.id(reviewId)

    if (!selectedReview) {
      res.status(404).send({ message: 'Review Not Found' })
    } 
    
    if (!currentUser._id.equals(selectedReview.user._id)) {
      res.status(401).send({ message: 'Unauthorized' })
    }

    selectedReview.remove()

    const savedRecipe = await selectedRecipe.save()

    res.status(201).send(savedRecipe)
  } catch (err) {
    next(err)
  }
}


export default {
  postReview,
  updateReview,
  deleteReview
}
