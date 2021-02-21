/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

it('Should be able to register a new user', () => {

  api.post('/api/register')
    .send({
      username: 'emily',
      email: 'emily@emily.com',
      password: 'emilyemily1',
      passwordConfirmation: 'emilyemily1'
    })
    .end((err, res) => {
      expect(res.status).to.eq(201)
      expect(res.body.username).to.eq('emily')
      done()
    })
})

it('Should be able to register user, then login a new user', done => {

  api.post('/api/register')
    .send({
      username: 'emily',
      email: 'emily@emily.com',
      password: 'emilyemily1',
      passwordConfirmation: 'emilyemily1'
    })
    .end((err, res) => {
      expect(res.status).to.eq(201)
      expect(res.body.username).to.eq('emily')

      api.post('/api/login')
        .send({
          email: 'emily@emily.com',
          password: 'emilyemily1'
        })
        .end((err, res) => {
          expect(res.status).to.eq(202)
          expect(res.body.token).to.be.a('string')

          done()
        })
    })
})

