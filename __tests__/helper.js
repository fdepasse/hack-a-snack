// Setting environemnt to be test on npm run test
process.env.NODE_ENV = 'test'

// Setting up CHAI (assertion libray / true or false about code tested)
import chai from 'chai'
global.expect = chai.expect

// Setting up Supertest
import supertest from 'supertest'
import expressApp from '../index.js'
global.api = supertest(expressApp)
