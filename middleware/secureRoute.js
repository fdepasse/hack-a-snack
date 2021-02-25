import jwt from 'jsonwebtoken'

import User from '../models/userSchema.js'
import { secret } from '../config/environment.js'

export default async function secureRoute(req, res, next) {
  try {

    const authToken = req.headers.authorization

    if (!authToken || !authToken.startsWith('Bearer')) {
console.log('pineapples')
      return res.status(401).send({ message: 'Unauthorized' })
    }

    const token = authToken.replace('Bearer ', '')

    jwt.verify(token, secret, async (err, data) => {

      if (err) {
        console.log('wassup')
        return res.status(401).send({ message: 'Unauthorized' })
      }

      const user = await User.findById(data.userId)

      if (!user) {
        console.log('sup')
        return res.status(401).send({ message: 'Unauthorized' })
      }

      req.currentUser = user

      next()
    })
  } catch (err) {
    console.log('weird beef woman')
    res.status(401).send({ message: 'Unauthorized' })
  }
}