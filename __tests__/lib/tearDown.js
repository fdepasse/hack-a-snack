import Recipes from '../../models/recipeSchema.js'
import User from '../../models/userSchema.js'

export default async function tearDown(done) {
  await User.deleteMany()
  await Recipes.deleteMany()
  
  done()
}