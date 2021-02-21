//file gets run once at the start of testing to ensure everything is set up properly 
process.env.NODE_ENV = 'test'

import chai from 'chai'
global.expect = chai.expect

import supertest from 'supertest'
import expressApp from '../index.js'

global.api = supertest(expressApp)


