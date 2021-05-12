const path = require('path');
const express = require('express');
const xss = require('xss');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonParser = express.json();

// don't necessarily need to serialize
const serializeUser = user => ({
    firstName: xss(user.firstname),
    lastName: xss(user.lastname),
    email: xss(user.email)
})

usersRouter
  .route('/')
  .get((req, res, next) => {
      const knexInstance = req.app.get("db")
      UsersService.getAllUsers(knexInstance)
        .then(users => {
            res.json(users.map(serializeUser))
        })
        .catch(next)
  })

  .post(jsonParser, (req, res, next) => {
      const { firstName, lastName, email, password } = req.body;
      const newUser = { email, password };

      for (const [key, value] of Object.entries(newUser)) {
          if (value == null) {
              return res.status(400).json({
                  error: { message: `Missing "${key}" in request body` }
              })
          }
      }


      // email validation
      UsersService.getByEmail(
          req.app.get("db"),
          email
      )
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({
                    error: { message: `Email already exists. Try another email`}
                })
            } else {
                newUser.firstname = firstName;
                newUser.lastname = lastName;
                newUser.email = email;
                newUser.password = password;

                UsersService.insertUser(
                    req.app.get("db"),
                    newUser
                )
                    .then(user => {
                        res
                            .status(201)
                            .location(path.posix.join(req.originalUrl, `/${user.email}`)) // do I need to create a user id to use for this path?
                            .json(serializeUser(user))
                    })
                    .catch(next)
                        }
                    })
  })

usersRouter
  .route('/:email')
  .all((req, res, next) => {
      UsersService.getByEmail(
          req.app.get("db"),
          req.params.email
      )
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: { message: `User doesn't exist` }
                })
            }
            res.user = user
            next()
        })
        .catch(next)
  })
  .get((req, res, next) => {
      res.json(serializeUser(res.user))
  })
  .delete((req, res, next) => {
      UsersService.deleteUser(
          req.app.get("db"),
          req.params.email
      )
      .then(numRowsAffected => {
          res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
      const { firstName, lastName, email, password } = req.body;
      const userToUpdate = { 
          firstname: firstName, 
          lastname: lastName,
          password: password 
        }

      const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
            error: {
                message: `Request body must contain either "first name", "last name", "email" or "password"`
            }
        })

        UsersService.updateUser(
            req.app.get("db"),
            req.params.email,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
  })

/*

Do I need this? 

const users = [];

app.post('/', (req, res) => {
    // get the data 
    const { firstName, lastName, email, password, } = req.body;

    // validation code below
    if (!firstName) {
        newUser.firstname = firstName;
        newUser.lastname = lastName;
        newUser.email = email;
        newUser.password = password;
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

*/ 

module.exports = usersRouter