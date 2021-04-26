require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

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
    console.log('The landing page was called');
    res.send('This is the landing page');
})

app.get('/list', (req, res) => {
    console.log('/list was called');
    res.json(concerts);
})

app.get('/new', (req, res) => {
    console.log('The add new concert page was called');
    res.send('This is the add new concert page');
})

app.get('/edit/:id', (req, res) => {
    console.log('The edit concert page was called');
    res.send('This is the edit concert page');
})

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