/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

// Test user end points
describe('Testing user end point', () => {
  beforeEach(done => {
    setup(done)
  })
  afterEach(done => {
    tearDown(done)
  })

  // Test 1
  it('Should register a new user', done => {
    api.post('/api/register')
      .send(
        {
          username: 'newuser1',
          email: 'newuser1@newuser1',
          password: 'newuser1',
          passwordConfirmation: 'newuser1'
        })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('newuser1')
        done()
      })
  })

  // Test 2
  it('Should register and login a new user', done => {
    api.post('/api/register')
      .send(
        {
          username: 'newuser1',
          email: 'newuser1@newuser1',
          password: 'newuser1',
          passwordConfirmation: 'newuser1'
        })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('newuser1')

        api.post('/api/login')
          .send(
            {
              email: 'newuser1@newuser1',
              password: 'newuser1'
            })
          .end((err, res) => {
            expect(res.status).to.eq(202)
            expect(res.body.token).to.be.a('string')
            done()
          })
      })
  })
})
