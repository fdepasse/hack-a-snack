import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number},
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const recipeSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  description: { type: String, required: true },
  linkOrMethod: { type: String, required: true },
  image: { type: String, required: true },
  servings: { type: Number, required: true },
  ingredients: {
    type: [String],
    required: true
  },
  source: { type: String },
  diet: { type: [String] },
  healthLabels: { type: [String] },
  allergens: { type: [String] },
  cookingTime: { type: Number, required: true },
  calories: { type: Number },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  review: [reviewSchema]
})

recipeSchema.index({ '$**': 'text' })

recipeSchema.plugin(uniqueValidator)

export default mongoose.model('Recipes', recipeSchema)