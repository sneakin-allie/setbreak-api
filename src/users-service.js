const knex = require('knex');

const UsersService = {
    getAllUsers(knex) {
        return knex.select("*").from("users")
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into("users")
            .returning("*")
            .then(rows => {
                return rows[0]
            })
    },

    // validate email here too
    getByEmail(knex, email) {
        return knex
            .from("users")
            .select("*")
            .where("email", email)
            .first()
    },
    
    deleteUser(knex, email) {
        return knex("users")
            .where({ email })
            .delete()
    },

    updateUser(knex, email, newUserFields) {
        return knex("users")
            .where({ email })
            .update(newUserFields)
    }
}

module.exports = UsersService