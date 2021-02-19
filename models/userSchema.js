import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  password: { type: String, required: true/*, validate: (password) => typeof password === 'string' && password.length > 8 && password.includes('\d')*/ },
  passwordConfirmation: { type: String, validate: () => userSchema.passwordConfirmation === userSchema.password },
  isAdmin: { type: Boolean }, 
  savedRecipes: [{ type: mongoose.Schema.ObjectId, ref: 'Recipes' }], 
  postedRecipes: [{ type: mongoose.Schema.ObjectId, ref: 'Recipes' }]
})

userSchema.pre('save', function encryptPassword(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  this.passwordConfirmation = bcrypt.hashSync(this.passwordConfirmation, bcrypt.genSaltSync())
  next()
})

userSchema.methods.validatePassword = function(password) {
  // console.log(bcrypt.compareSync(password, this.password))
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(uniqueValidator)
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

export default mongoose.model('User', userSchema)