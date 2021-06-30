const knex = require('knex');

const ConcertsService = {
    getAllConcerts(knex) {
        return knex
            .select("*")
            .from("concerts");
    },

    getByEmail(knex, email) {
        return knex
            .from("concerts")
            .select("*")
            .where("email", email)
    },
   
    insertConcert(knex, newConcert) {
        return knex
            .insert(newConcert)
            .into("concerts")
            .returning("*")
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex
            .from("concerts")
            .select("*")
            .where("id", id)
            .first()
    },

    deleteConcert(knex, id) {
        return knex("concerts")
            .where({ id })
            .delete()
    },

    updateConcert(knex, id, newConcertFields) {
        return knex("concerts")
            .where({ id })
            .update(newConcertFields)
    }
};

module.exports = ConcertsService