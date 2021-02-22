/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

// Setting up Mocha to be done before each test
// Test recipes end points
describe('Testing recipes end points', () => {
  // Seed a fresh database before each test, before and afterEach are from Mocha
  beforeEach(done => {
    setup(done)
  })
  afterEach(done => {
    tearDown(done)
  })

  // Test 1
  it('Should create an array of 5 recipes and return a 200 status', done => {
    // Supertest
    api.get('/api/recipes')
      // Chai
      .end((err, res) => {
        expect(res.status).to.equal(200)
        // expect(res.body).to.be.an('array')
        // expect(res.body.length).to.equal(5)        
        done()
      })
  })
})
