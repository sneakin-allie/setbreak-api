require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { v4: uuid } = require('uuid');

const app = express();

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

app.get('/list', (req, res) => {
    console.log('/list was called');
    res.json(concerts);
})

app.get('/new', (req, res) => {
    console.log('The add new concert page was called');
    res.send('This is the add new concert page');
})

app.post('/new', (req, res) => {
    // add a new concert
})

app.get('/edit/:id', (req, res) => {
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
    console.log('The stats page was called');
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

module.exports = app