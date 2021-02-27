const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/usersmodel.js')


users.get('/', (req, res) => {
    res.render('users.ejs')
})

users.post('/newuser', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        console.log(createdUser)
        res.redirect('/')
    })
})

users.post('/newsession', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => { 
    if (err) {
        console.log(err)
        res.send('error')
    } else if (!foundUser) {
        res.send('user not found')
    } else {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser
            res.redirect('/')
        } else {
            res.send('passwords do not match')
        }
    }
    })
})

module.exports = users