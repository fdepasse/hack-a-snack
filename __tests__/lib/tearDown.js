import User from '../../models/userSchema.js'
import Recipes from '../../models/recipeSchema.js'

export default async function tearDown(done) {
  await User.deleteMany()
  await Recipes.deleteMany()
  done()
}
