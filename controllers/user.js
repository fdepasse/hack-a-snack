import User from '../models/userSchema.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'



async function register(req, res, next) {
  const body = req.body

  try {
    const newReg = await User.create(body)
    res.send(newReg)
  } catch (err) {
    next(err)
  }
}


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

async function getUser(req, res, next) {
  const userId = req.params.userId
  try {
    const singleUser = await User.findById(userId)
    res.send(singleUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function updateProfile(req, res, next) {
  const userId = req.params.userId
  const body = req.body
  const currentUser = req.currentUser

  try {

    const singleUser = await User.findById(userId)

    if (!singleUser) {
      return res.send({ message: 'No user found!' })
    }

    if (!singleUser._id.equals(currentUser._id)) {
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