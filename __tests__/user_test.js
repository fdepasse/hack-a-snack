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

  it('Fail @ sign missing', done => {

    api.post('/api/register')
      .send({
        username: 'mrtest@test',
        email: 'test@tester.com',
        password: 'mrtesttest229',
        passwordConfirmation: 'mrtesttest229'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })

  it('Fail period missing from email', done => {

    api.post('/api/register')
      .send({
        username: 'mrtesttest',
        email: 'test@testercom',
        password: 'mrtesttest229',
        passwordConfirmation: 'mrtesttest229'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })

  it('Fail @ sign is missing from email', done => {

    api.post('/api/register')
      .send({
        username: 'mrtesttest',
        email: 'testtester.com',
        password: 'mrtesttest229',
        passwordConfirmation: 'mrtesttest229'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })


  it('Fail password length too short', done => {

    api.post('/api/register')
      .send({
        username: 'mrtesttest',
        email: 'test@tester.com',
        password: 'short',
        passwordConfirmation: 'short'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })

  it('Fail password confirmation does not match', done => {

    api.post('/api/register')
      .send({
        username: 'mrtesttest',
        email: 'test@tester.com',
        password: 'thiswontmatch',
        passwordConfirmation: 'thispassword'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })
  })

  it('Username is already taken', done => {

    api.post('/api/register')
      .send({
        username: 'jess',
        email: 'test@tester.com',
        password: 'thiswontmatch',
        passwordConfirmation: 'thispassword'
      })
      .end((err, res) => {
        expect(res.status).to.equal(422)
        done()
        console.log(err)
      })



  })
})
