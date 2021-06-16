const knex = require('knex');

const UsersService = {
    getAllUsers(knex) {
        return knex.select("*").from("users")
    },

    // ORIGINAL THAT WORKS FOR EMAIL BUT NOT PASSWORD
    getByEmail(knex, email) {
        return knex
            .from("users")
            .select("*")
            .where("email", email)
            .first()
    },

    // UPDATED THAT FIXES PASSWORD ISSUE
    getByEmailAndPassword(knex, email, password) {
        return knex
            .from("users")
            .select("*")
            .where({ "email": email, "password": password })
            .first()
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