const path = require('path');
const express = require('express');
const xss = require('xss');
const ConcertsService = require('./concerts-service')

const concertsRouter = express.Router()
const jsonParser = express.json()

const serializeConcert = concert => ({
    id: concert.id,
    date: concert.date,
    artist: concert.artist,
    venue: concert.venue,
    songs: concert.songs,
    notes: concert.notes
})

concertsRouter
    .route('/list')
    .get((req, res, next) => {
        const knexInstance = req.app.get("db")
        ConcertsService.getAllConcerts(knexInstance)
            .then(concerts => { 
                res.json(concerts.map(serializeConcert))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { email, date, artist, venue, songs, notes } = req.body
        const newConcert = { email, date, artist, venue, songs, notes }

        ConcertsService.insertConcert(
            req.app.get("db"),
            newConcert
        )
            .then(concert => {
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${concert.id}`))
                .json(serializeConcert(concert))
            })
            .catch(next)
    })

concertsRouter
    .route('/:concert_id')
    .all((req, res, next) => {
        ConcertsService.getById(
            req.app.get("db"),
            req.params.concert_id
        )
            .then(concert => {
                if (!concert) {
                    return res.status(404).json({
                        error: { message: `Concert doesn't exist` }
                    })
                }
                res.concert = concert
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeConcert(res.concert))
    })
    .delete((req, res, next) => {
        ConcertsService.deleteConcert(
            req.app.get("db"),
            req.params.concert_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { date, artist, venue, songs, notes } = req.body

        const concertToUpdate = {};
        if (date) {
            concertToUpdate.date = date
        }
        if (artist) {
            concertToUpdate.artist = artist
        }
        if (venue) {
            concertToUpdate.venue = venue
        }
        if (songs) {
            concertToUpdate.songs = songs
        }
        if (notes) {
            concertToUpdate.notes = notes
        }

        ConcertsService.updateConcert(
            req.app.get("db"),
            req.params.concert_id,
            concertToUpdate
        )
            .then(updatedConcert => {
                res.status(200).json(updatedConcert)
            })
            .catch(next)
    })

module.exports = concertsRouter