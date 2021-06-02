const knex = require('knex');
const app = require('./../src/app');
const supertest = require('supertest');
const { expect } = require('chai');
const { TEST_DATABASE_URL } = require('./../src/config');

describe('Setbreak users API:', function () {
  let db;
  let users = [
    {
      "firstname": "Allison",
      "lastname": "Schulman",
      "email": "allison.d.schulman@gmail.com",
      "password": "password123"
    },
    {
      "firstname": "Justin",
      "lastname": "Iwinski",
      "email": "just.winski@gmail.com",
      "password": "password456"
    },
    {
      "firstname": "Leah",
      "lastname": "Thomas",
      "email": "leah.thomas@gmail.com",
      "password": "password789"
    }
  ]

  before('make knex instance', () => {  
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL,
    })
  
    app.set('db', db)
  });

  before('cleanup', () => db.raw('DELETE from CONCERTS;'));
  
  before('cleanup', () => db.raw('DELETE from USERS;'));

  afterEach('cleanup', () => db.raw('DELETE from CONCERTS;')); 

  afterEach('cleanup', () => db.raw('DELETE from USERS;')); 

  after('disconnect from the database', () => db.destroy()); 

  describe('GET /api/users', () => {

    beforeEach('insert some users', () => {
      return db('users').insert(users);
    })

    it('should respond to GET `/api/users` with an array of users and status 200', function () {
      return supertest(app)
        .get('/api/users')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('array');
        });
    });

  });

  describe('POST /api/users', function () {

    it('should create and return a new user when provided valid data', function () {
      const newUser = {
        "firstName": "Alfredo",
        "lastName": "Salazar",
        "email": "alfredo.salazar@gmail.com",
        "password": "password100"
      };

      return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('firstName', 'lastName', 'email')
        });
    });

  });

  describe('PATCH /api/users/:email', () => {

    beforeEach('insert some users', () => {
      return db('users').insert(users);
    })

    it('should update a user when given valid data and an email', function () {
      const newUser = {
        "firstName": "Allison",
        "lastName": "Iwinski",
        "password": "password123"
      };
      
      let doc; 
      return db('users') 
        .first()
        .then(_doc => {
          doc = _doc
          return supertest(app)
            .patch(`/api/users/${doc.email}`)
            .send(newUser)
            .expect(200);
        })
        .then(res => {
          expect(res.body).to.equal(1);
          expect(res.body).to.be.a("number");
        });
    });

  });

  describe('DELETE /api/users/:email', () => {

    beforeEach('insert some users', () => {
      return db('users').insert(users);
    })

    it('should delete a user by email', () => {
      return db('users')
        .first()
        .then(doc => { 
          return supertest(app)
            .delete(`/api/users/${doc.email}`)
            .expect(204)
        })
    });

  });


});

describe('Setbreak concerts API:', function () {
  let db;
  let concerts = [
    {
      "email": "allison.d.schulman@gmail.com",
      "date": "07-24-1993",
      "artist": "Phish",
      "venue": "Great Woods",
      "songs": "Llama, Horn, Mango Song",
      "notes": "2001 into SOAM into Fluffhead. Short 2001 but perfect transition into SOAM."
    },
    {
      "email": "allison.d.schulman@gmail.com",
      "date": "10-26-2010",
      "artist": "Phish",
      "venue": "Verizon Wireless Arena",
      "songs": "Walls of the Cave",
      "notes": "Llama reprise"
    },
    {
      "email": "allison.d.schulman@gmail.com",
      "date": "04-04-1998",
      "artist": "Phish",
      "venue": "Providence Civic Center",
      "songs": "2001, David Bowie",
      "notes": "Video wasn't the best but the sound was"
    }
  ]

  before('make knex instance', () => {  
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL,
    })
  
    app.set('db', db)
  });

  describe('GET /api/concerts/list', () => {

    beforeEach('insert some concerts', () => {
      return db('concerts').insert(concerts);
    })

    it('should respond to GET `/api/concerts/list` with an array of concerts and status 200', function () {
      return supertest(app)
        .get('/api/concerts/list')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('array');
        });
    });

  });

  describe('POST /api/concerts/list', function () {

    it('should create and return a new concert when provided valid data', function () {
      const newConcert = {
        "email": "allison.d.schulman@gmail.com",
        "id": 4,
        "date": "02-22-2019",
        "artist": "Phish",
        "venue": "Riviera Maya",
        "songs": "Walk Away",
        "notes": "YEM opener. Good choice! Don't need to hear No Man's Land ever again though"
      };

      return supertest(app)
        .post('/api/concerts/list')
        .send(newConcert)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'date', 'artist', 'venue', 'songs', 'notes')
        });
    });

  });

  describe('PATCH /api/concerts/:id', () => {

    beforeEach('insert some concerts', () => {
      return db('concerts').insert(concerts);
    })

    it('should update a concert when given valid data and an id', function () {
      const updatedConcert = {
        "email": "allison.d.schulman@gmail.com",
        "id": 4,
        "notes": "Don't need to hear No Man's Land ever again"
      };
      
      let doc;
      return db('concerts')
        .first()
        .then(_doc => {
          doc = _doc
          return supertest(app)
            .patch(`/api/concerts/${doc.id}`)
            .send(updatedConcert)
            .expect(200);
        })
        .then(res => {
          expect(res.body).to.equal(1);
          expect(res.body).to.be.a("number");
        });
    });

  });

  describe('DELETE /api/concerts/:id', () => {

    beforeEach('insert some concerts', () => {
      return db('concerts').insert(concerts);
    })

    it('should delete a concert by id', () => {
      return db('concerts')
        .first()
        .then(doc => {
          return supertest(app)
            .delete(`/api/concerts/${doc.id}`)
            .expect(204)
        })
    });

  });

});