/* Libs */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Response = require('../util/response');

/* Models */
const User = require('../models/user');

/* Sign Up */
//TODO: Kullanıcı kayıt olması için öğrenci no iste
//TODO: Öğrenci noya göre fakülte ve bölümü bul
//TODO: Onay email'i gönder
exports.signup = (req, res, next) => {
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
                        username: req.body.email.split('@')[0],
                        role: 4
                    });
                    user
                    .save()
                    .then(result => {
                        res.status(201).send("OK");
                    })
                    .catch(err => {
                        let response = new Response(err.toString(), 'User cant create!');
                        res.status(500).json(response);
                    });
                }
            });
        }
    });
};

/* Login */
//TODO: Giriş yapan kullanıcı email'i onaylı mı diye kontrol et
exports.login = (req, res, next) => {
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
            let response = new Response(err.toString(), `Failure on querying departments of university ${uni.name}`);
            res.status(500).json(response);
        });
};

/* Get A User By UserId */
exports.getUserById = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
    .select('_id email role emailVerify name surname username faculty department favList attendedEvents')
    .exec()
    .then(user => {
        if (user) {
            let response = new Response(user, `The user by id: ${userId}`);
            res.status(200).json(response);
        } else {
            res.status(404).json({
                message: "No valid user found."
            });
        }
    })
    .catch(err => {
        let response = new Response(err.toString(), `User can not find by id: ${userId}`);
        res.status(500).json(response);
    });
};

exports.getUserByUserName = (req, res, next) => {
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
            let response = new Response(err.toString(), `User can not find by username: ${username}`);
            res.status(500).json(response);
        });
};

exports.delete = (req, res, next) => {
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
            let response = new Response(err.toString(), `Failure on querying departments of university ${uni.name}`);
            res.status(500).json(response);
        })
};