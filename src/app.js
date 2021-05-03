require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { v4: uuid } = require('uuid');
const knex = require('knex');
const ConcertsService = require('./concerts-service')
const usersRouter = require('./users-router')
const concertsRouter = require('./concerts-router')

const knexInstance = knex({
    client: 'pg',
    connection: 'process.env.DB_URL'
})

const app = express();

app.use("/api/users", usersRouter)
app.use("/api/concerts", concertsRouter)


/*
ConcertsService.getAllConcerts(knexInstance)
    .then(concerts => console.log(concerts))
    .then(() =>
        ConcertsService.insertConcert(knexInstance, {
            id: "new id", // not sure what all these values should be
            date: "new date",
            artist: "new artist",
            venue: "new venue",
            songs: "new songs",
            notes: "new notes"
        })
    )
    .then(newConcert => {
        console.log(newConcert)
        return ConcertsService.updateConcert(
            knexInstance,
            newConcert.id,
            {
                id: "updated id", 
                date: "updated date",
                artist: "updated artist",
                venue: "updated venue",
                songs: "updated songs",
                notes: "updated notes"
            }
        ).then(() => ConcertsService.getById(knexInstance, newConcert.id))
    })
    .then(concert => {
        console.log(concert)
        return ConcertsService.deleteConcert(knexInstance, concert.id)
    })

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const concerts = require ('./concerts-data.js');

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/api/*', (req, res) => {
    res.json({ok: true});
})

app.get('/', (req, res) => {
    console.log('/ was called');
    res.send('This is the landing page');
})

const users = [];

app.post('/', (req, res) => {
    // get the data 
    const { firstName, lastName, email, password, } = req.body;

    // validation code below
    if (!firstName) {
        return res
            .status(400)
            .send("First name is required");
    }

    if (!lastName) {
        return res
            .status(400)
            .send("Last name is required");
    }

    if (!email) {
        return res
            .status(400)
            .send("Email is required");
    }

    if (!password) {
        return res
            .status(400)
            .send("Password is required");
    }

    const id = uuid(); // generate a unique id
    const newUser = {
        firstName,
        lastName,
        email,
        password
    };

    users.push(newUser);

    // when all validation passes
    res.send("All validation passed");
});

app.get('/list', (req, res, next) => {
    const knexInstance = req.app.get("db")
    ConcertsService.getAllConcerts(knexInstance)
        .then(concerts => {
            res.json(concerts)
        })
        .catch(next)
})

app.get('/new', (req, res) => {
    console.log('/new was called');
    res.send('This is the add new concert page');
})

app.post('/new', (req, res) => {
    // add a new concert
})

app.get('/edit/:id', (req, res, next) => {
    const knexInstance = req.app.get('db')
    ConcertsService.getById(knexInstance, req.params.concert.id)
        .then(concert => {
            res.json(concert)
        })
        .catch(next)
})

app.patch('/edit/:id', (req, res) => {
    console.log('/edit/:id was called');
    res.send('This is the edit concert page');
})

app.delete('/edit/:id', (req, res) => {
    const { id } = req.params;
    const index = concerts.findIndex(con => con.id === id);

    concerts.splice(index, 1);

    res
        .status(204)
        .end();
});

app.get('/stats', (req, res) => {
    console.log('/stats was called');
    res.send('This is the statistics page');
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' }}
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

*/

module.exports = app