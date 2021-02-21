process.env.NODE_ENV = 'test'

import chai from 'chai'

global.expect = chai.expect

import supertest from 'supertest'

import expressApp from '../index.js'

global.api = supertest(expressApp)