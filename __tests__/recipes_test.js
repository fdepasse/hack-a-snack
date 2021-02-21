import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

describe('Testing GET recipes', () => {

  beforeEach(done => {
    setup(done)
  })

  afterEach(done => {
    tearDown(done)
  })

  it('should return a 201 response', done => {
    api.get('/api/recipes')
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  // ? This is an individual test:
  // it('should return an array of 4 pokemon', done => {
  //   // ! The api part is SUPERTEST
  //   api.get('/api/pokemon')
  //     .end((err, res) => {
  //       // ? Expect its an array
  //       // ! the expect part is CHAI
  //       expect(res.body).to.be.an('array')
  //       expect(res.body.length).to.eq(4)
  //       done()
  //     })
  // })

})