/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'


describe('Testing STRESSIPIES', () => {

  beforeEach(done => {
    setup(done)
  })

  afterEach(done => {
    tearDown(done)
  })


  it('Should be able to register a new user', done => {

    api.post('/api/register')

      .send({
        username: 'mrtesttest',
        email: 'test@tester.com',
        password: 'mrtesttest229',
        passwordConfirmation: 'mrtesttest229'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        done()
        console.log(err)
      })
  })

  it('Fail @ sign missing', done => {

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





