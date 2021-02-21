import dotenv from 'dotenv'
dotenv.config()

//get the environment we're in right now
const environment = process.env.NODE_ENV || 'development'

export const dbURI = environment === 'production'
  ? process.env.MONGODB_URI
  :`mongodb://localhost/recipedb-${environment}`


export const port = 8000
export const secret = 'This is a really long secret string that only we know sldanflsdf;dlskanflksdajfl;k'
