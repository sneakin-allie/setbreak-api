require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { v4: uuid } = require('uuid');
const knex = require('knex');
const usersRouter = require('./users-router')
const concertsRouter = require('./concerts-router')

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use("/api/users", usersRouter)
app.use("/api/concerts", concertsRouter)
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())


/*

still confused if I need these and where to put them

app.get('/list', (req, res, next) => {
    const knexInstance = req.app.get("db")
    ConcertsService.getAllConcerts(knexInstance)
        .then(concerts => {
            res.json(concerts)
        })
        .catch(next)
})

app.get('/edit/:id', (req, res, next) => {
    const knexInstance = req.app.get('db')
    ConcertsService.getById(knexInstance, req.params.concert.id)
        .then(concert => {
            res.json(concert)
        })
        .catch(next)
})

*/

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