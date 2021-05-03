const express = require('express')
// const ConcertsService = require('./concerts-service')

const concertsRouter = express.Router()
const jsonParser = express.json()

concertsRouter
    .route('/list')
    .get((req, res) => {
        res.status(201)
            .json("Hello there")
    })

    .post((req, res) => {
        res.status(201)
            .json("Hello again")
            // receive fields, store on database, and return response (just added object)
    })

    .patch((req, res) => {
        res.status(201)
            .json("Hello a third time")
    })

    .delete((req, res) => {
        res.status(201)
            .json("Hello for the final delete")
    })

  /*
  .get((req, res, next) => {
    ConcertsService.getAllConcerts(
      req.app.get('db')
    )
      .then(concerts => {
        res.json(concerts)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { id, date, artist, venue, songs, notes } = req.body
    const newConcert = { id, date, artist, venue, songs, notes }
    ConcertsService.insertConcert(
      req.app.get('db'),
      newConcert
    )
      .then(concert => {
        res
          .status(201)
          .location(`/list/${concert.id}`)
          .json(concert)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
      ConcertsService.deleteConcert(
          req.app.get("db"),
          req.params.concert.id
      )
      .then(() => {
          res.status(204).end()
      })
      .catch(next)
  })
  */

module.exports = concertsRouter