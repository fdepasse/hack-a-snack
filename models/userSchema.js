import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'

//!! install below backage for this too work
// import isEmail from 'validator/lib/isEmail.js'
// //npm install validator 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'Not a valid email hunny'
    }
  },
  image: { type: String },
  password: { type: String, required: true, minlength: 8, message: 'Password must be more than 8 character...' },
  isAdmin: { type: Boolean },
  savedRecipes: [{ type: mongoose.Schema.ObjectId, ref: 'Recipes' }],
  postedRecipes: [{ type: mongoose.Schema.ObjectId, ref: 'Recipes' }]
})



userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})


userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'Both passwords must match for you to enter!')
    }
    next()
  })

userSchema.plugin(uniqueValidator)
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, passwordConfirmation: true } }))


export default mongoose.model('User', userSchema)






// userSchema.pre('save', function encryptPassword(next) {
//   this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
//   this.passwordConfirmation = bcrypt.hashSync(this.passwordConfirmation, bcrypt.genSaltSync())
//   next()
// })

// userSchema.methods.validatePassword = function(password) {
//   // console.log(bcrypt.compareSync(password, this.password))
//   return bcrypt.compareSync(password, this.password)
// }

// userSchema.plugin(uniqueValidator)
// userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

// export default mongoose.model('User', userSchema)