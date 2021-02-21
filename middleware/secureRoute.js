import jwt from 'jsonwebtoken'

import User from '../models/userSchema.js'
import { secret } from '../config/environment.js'

export default async function secureRoute(req, res, next) {
  try {

    const authToken = req.headers.authorization

    if (!authToken || !authToken.startsWith('Bearer')) {

      return res.status(401).send({ message: 'Unauthorized' })
    }

    const token = authToken.replace('Bearer ', '')

    jwt.verify(token, secret, async (err, data) => {

      if (err) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      const user = await User.findById(data.userId)

      if (!user) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      req.currentUser = user

      next()
    })
  } catch (err) {
    res.status(401).send({ message: 'Unauthorized' })
  }
}