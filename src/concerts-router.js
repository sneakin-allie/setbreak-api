const path = require('path');
const express = require('express');
const xss = require('xss');
const ConcertsService = require('./concerts-service')

const concertsRouter = express.Router()
const jsonParser = express.json()

// might remove this
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
    .route('/:concert.id')
    .all((req, res, next) => {
        ConcertsService.getById(
            req.app.get("db"),
            req.params.concert.id
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
            req.params.concert.id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { id, date, artist, venue, songs, notes } = req.body
        const concertToUpdate = { id, date, artist, venue, songs, notes }

        ConcertsService.updateConcert(
            req.app.get("db"),
            req.params.concert.id,
            concertToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    /*

    .delete('/edit/:id', (req, res) => {
        const { id } = req.params;
        const index = concerts.findIndex(con => con.id === id);
    
        concerts.splice(index, 1);
    
        res
            .status(204)
            .end();
    });

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

    */

module.exports = concertsRouter