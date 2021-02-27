const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/usersmodel.js')


users.get('/', (req, res) => {
    res.render('users.ejs')
})

users.post('/' ,(req, res)=> {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        console.log(createdUser)
        res.redirect('/')
    })
})

module.exports = users