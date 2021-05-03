const express = require('express')
// const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
  .route('/')
  .get((req, res) => {
    res.status(201)
    .json("Hello there")
  })

  .post((req, res) => {
      res.status(201)
      .json("Hello again")
      // receive fields, store on database, and return response (just added object)
  })

module.exports = usersRouter