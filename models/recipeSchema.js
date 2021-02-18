import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
	rating: { type: Number, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, 
{
  timestamps: true
})
const recipeSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  description: { type: String, required: true },
  linkOrMethod: { type: String, required: true },
	image: { type: String, required: true },
  yield: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  source: { type: String },
	diet: { type: [String] },
	healthlabels: { type: [String] },
	allergens: { type: [String] },
	time: { type: Number, required: true },
	calories: { type: Number },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  review: [ reviewSchema ]
})

recipeSchema.plugin(uniqueValidator)

export default mongoose.model('Recipes', recipeSchema)