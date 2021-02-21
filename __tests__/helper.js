<<<<<<< HEAD
//!This helper file will run first and will run on the command - NPM RUN TEST
process.env.NODE_ENV = 'test'

//! Chai - assertion
//! Assertions evaluate to true or false, checking if the values match expected values...(is recipe a number a string?)
import chai from 'chai'

//! make it a global variable
global.expect = chai.expect

//! SuperTest - this can let you make requests programmatically 
import supertest from 'supertest'
import expressApp from '../index.js'

//!! this is wrapping the entire express App and then wrapping it so we can run tests on the program
global.api = supertest(expressApp)
=======
// Setting environemnt to be test on npm run test
process.env.NODE_ENV = 'test'

// Settting up CHAI (assertion libray / true or false about code tested)
import chai from 'chai'
global.expect = chai.expect

// Setting up Supertest
import supertest from 'supertest'
import expressApp from '../index.js'
global.api = supertest(expressApp)
>>>>>>> development
