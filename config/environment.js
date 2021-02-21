import dotenv from 'dotenv'
dotenv.config()

const enviroment = process.env.NODE_ENV || 'development'


//!
export const dbURI = enviroment === 'production'
//!! if true use the enviroment MONGO DB URL which will be production Mongo Atlas
  ? process.env.MONGODB_URI
  //!! this wil then be used for development and testing
  : `mongodb://localhost/recipedb-${enviroment}`

export const port = 8000
export const secret = process.env.SECRET
