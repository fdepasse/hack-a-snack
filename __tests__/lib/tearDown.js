import recipeSchema from '../../models/recipeSchema.js'
import userSchema from '../../models/userSchema.js'

export default async function tearDown(done) {
  await recipeSchema.deleteMany()
  await userSchema.deleteMany()
  done()
}