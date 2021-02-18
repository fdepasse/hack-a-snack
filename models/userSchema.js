import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  password: { type: String, required: true, validate: (password) => typeof password === 'string' && password.length > 8 && password.includes('\d') },
  passwordConfirmation: { type: String, validate: () => schema.passwordConfirmation === schema.password },
  isAdmin: { type: Boolean }, 
  savedRecipes: [], 
  postedRecipes: [{ type: mongoose.Schema.ObjectId, ref: 'Recipes' }]
})

schema.pre('save', function encryptPassword(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  this.passwordConfirmation = bcrypt.hashSync(this.passwordConfirmation, bcrypt.genSaltSync())
  next()
})

schema.methods.validatePassword = function(password) {
  console.log(bcrypt.compareSync(password, this.password))
  return bcrypt.compareSync(password, this.password)
}

schema.plugin(uniqueValidator)
schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

export default mongoose.model('User', schema)