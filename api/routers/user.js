/* Libs */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Middleware */
const checKAuth = require('../middleware/check-auth');

/* Objects */
const User = require('../models/user');

/* Sign Up */
router.post('/signup', (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists.'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash,
              name: req.body.email.split('@')[0].split('.')[0],
              surname: req.body.email.split('@')[0].split('.')[1],
              username: req.body.email.split('@')[0]
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: 'User created.'
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                })
              });
          }
        });
      }
    });
});

/* Sign In */
router.post('/login', (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1) { //There is no such a user
        return res.status(401).json({
          message: 'Auth failed.'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ // Error
            message: 'Auth failed.'
          })
        }
        if (result) {
          const token = jwt.sign({
              role: user[0].role,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            });
          return res.status(200).json({ // Correct password
            message: 'Auth Successful.',
            token: token,
            user: {
              id : user[0]._id,
              email: user[0].email,
              role: user[0].role,
              emailVerify: user[0].emailVerify,
              name: user[0].name,
              surname: user[0].surname,
              username: user[0].username,
              gender: user[0].gender,
              faculty: user[0].faculty,
              department: user[0].department,
              favList: user[0].favList
            }
          })
        }
        return res.status(401).json({ //Wrong password
          message: 'Auth failed.'
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
})

/* Get User Data bu userId */
router.get('/:userID', (req, res, next) => {
  const id = req.params.userID;
  console.log(id)
  User.findById(id)
    .select('_id email role emailVerify name surname username faculty department favList attendedEvents')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          id: doc._id,
          email: doc.email,
          role: doc.role,
          emailVerify: doc.emailVerify,
          name: doc.name,
          surname: doc.surname,
          username: doc.username,
          gender: doc.gender,
          faculty: doc.faculty,
          department: doc.department,
          favList: doc.favList,
          attendedEvents: doc.attendedEvents
        });
      } else {
        res.status(404).json({
          message: "No valid user found."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

/* Get User Data by username */
router.get('/find/:username', (req, res, next) => {
  const username = req.params.username;
  User.find({username: username})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(409).json({
          message: 'There is no such a user.'
        })
      } else {
        res.status(200).json({
          id: user[0]._id,
          email: user[0].email,
          role: user[0].role,
          emailVerify: user[0].emailVerify,
          name: user[0].name,
          surname: user[0].surname,
          username: user[0].username,
          gender: user[0].gender,
          faculty: user[0].faculty,
          department: user[0].department,
          favList: user[0].favList,
          attendedEvents: user[0].attendedEvents
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

/* Delete a User */
router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted.',
        id: id,
        deleted: 1
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});
module.exports = router;
