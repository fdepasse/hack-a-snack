import dotenv from 'dotenv'
dotenv.config()

export const secret = process.env.SECRET || 'This is a really long secret string that only we know sldanflsdf;dlskanflksdajfl;k'

export const port = process.env.PORT || 8000

const environment = process.env.NODE_ENV || 'development'

export const dbURI = environment === 'production'

  ? process.env.MONGODB_URI

  : `mongodb://localhost/recipesdb-${environment}`

