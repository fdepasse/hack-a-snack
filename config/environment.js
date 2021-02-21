import dotenv from 'dotenv'
dotenv.config()

const environment = process.env.NODE_ENV || 'development'

export const dbURI = environment === 'production'
  ? process.env.MONGODB_URImongodb
  : `mongodb://localhost/recipedb-${environment}`

export const port = 8000
export const secret = process.env.SECRET
