import User from '../models/userSchema.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'


//!! This will allow anyone to register
//!! No guard condition but error handling is done on the userSchema
async function register(req, res, next) {
  const body = req.body
  try {
    const newReg = await User.create(body)
    res.send(newReg)
  } catch (err) {
    next(err)
  }
}

//!! This will allow anyone to login and retrieve a bearer token
async function login(req, res, next) {
  const password = req.body.password
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(password)) {
      return res.status(401).send({ message: 'Wrong password hun!' })
    }
    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: '12h' }
    )
    res.status(202).send({ token, message: 'You unlocked me hunny!' })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

//!! This will allow ANYONE LOGGED IN, to View ANYONE'S PROFILE
async function getUser(req, res, next) {
  const userId = req.params.userId
  try {
    const singleUser = await User.findById(userId)
    if (!userId) {
      return res.status(401).send({ message: 'Profile does not exist' })
    }
    res.send(singleUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
}


//!! This will only allow admin OR the user that created the account to UPDATE the account
//!! To update your account you will need to also enter your password.
async function updateProfile(req, res, next) {
  const userId = req.params.userId
  const body = req.body
  const currentUser = req.currentUser

  try {

    const singleUser = await User.findById(userId)

    if (!singleUser) {
      return res.send({ message: 'No user found!' })
    }

    if (!currentUser.isAdmin && !singleUser._id.equals(currentUser._id)) {
      return res.status(401).send({ message: 'You cannot edit this account ' })
    }
    singleUser.set(body)
    singleUser.save()
    res.status(201).send(singleUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
}



export default {
  register,
  login,
  getUser,
  updateProfile
}