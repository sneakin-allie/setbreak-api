const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');

// written with Alfredo
describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})

/*

// written by me for each endpoint; 4 for each (users & concerts), 8 total

// tests for users endpoints
describe('Users endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  describe(`GET /api/users`, () => {
    it('GET / responds with 200 containing "Hello, world!"', () => {
      return supertest(app)
        .get('/api/users')
        .expect(200, 'Hello, world!')
    })
  })

  describe(`POST /api/users`, () => {
    it('POST / responds with 200 containing "Hello, world!"', () => {
      return supertest(app)
        .get('/api/users')
        .expect(200, 'Hello, world!')
    })
  })

  describe(`PATCH /api/users`, () => {
    it('PATCH / responds with 200 containing "Hello, world!"', () => {
      return supertest(app)
        .get('/api/users')
        .expect(200, 'Hello, world!')
    })
  })

  describe(`DELETE /api/users`, () => {
    it('DELETE / responds with 200 containing "Hello, world!"', () => {
      return supertest(app)
        .get('/api/users')
        .expect(200, 'Hello, world!')
    })
  })
})

// tests for concerts endpoints
describe('Concerts endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  describe(`GET /api/concerts`, () => {
    it('GET / responds with 200 containing "Hello, world!"', () => {
      return supertest(app)
        .get('/api/concerts')
        .expect(200, 'Hello, world!')
    })
  })

  describe(`POST /api/concerts`, () => {
    it('POST / responds with 200 containing "Hello, world!"', () => {
      return supertest(app)
        .get('/api/concerts')
        .expect(200, 'Hello, world!')
    })
  })

  describe(`PATCH /api/concerts`, () => {
    it('PATCH / responds with 200 containing "Hello, world!"', () => {
      return supertest(app)
        .get('/api/concerts')
        .expect(200, 'Hello, world!')
    })
  })

  describe(`DELETE /api/users`, () => {
    it('DELETE / responds with 200 containing "Hello, world!"', () => {
      return supertest(app)
        .get('/api/concerts')
        .expect(200, 'Hello, world!')
    })
  })
})

*/