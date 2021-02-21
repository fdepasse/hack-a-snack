import mongoose from 'mongoose'
import connectToDb from '../lib/connectToDb.js'

import Recipes from '../models/recipeSchema.js'
import User from '../models/userSchema.js'

import getRecipeData from './data/recipeData.js'
import getUserData from './data/userData.js'

async function seedDatabase() {
  try {
    await connectToDb()

    console.log('🤖 Database connected!')

    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database was dropped!')

    const users = await User.create(getUserData())

    console.log(`🤖 ${users.length} users created!`)

    const recipeData = await getRecipeData(users)

    const recipe = await Recipes.create(recipeData.flat())

    console.log(`🤖 ${recipe.length} recipe created!`)

    await mongoose.connection.close()

    console.log('🤖 Goodbye!')

  } catch (err) {
    console.log('🤖 Something went wrong with seeding!')
    console.log(err)

    await mongoose.connection.close()
    console.log('🤖 Goodbye!')
  }
}

seedDatabase()