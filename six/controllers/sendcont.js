const express = require('express')
const send = express.Router()
const Clicky = require('../models/clickmodel.js')
const User = require('../models/usersmodel.js')


send.post('/',(req, res) => {
    Clicky.find({user: req.session.currentUser}, (error, all) => {
        res.render('send.ejs' , {
            content : req.body,
            complete : all
        })
    })
})

send.post('/commit',(req, res) => {
    User.findOne({username: req.body.to}, (error, foundUser)=>{
        if(foundUser.username === undefined){
            res.send('no such person')
        }else if(req.body.to === 'PUBLIC'){
            req.body.user = req.body.to
            req.body.tags += ',PUBLIC'
            req.body.tags = req.body.tags.split(",")
            req.body.tags = req.body.tags.map(s => s.trim())
            Clicky.create(req.body, (err, newClick) =>{
                req.body.user = req.session.currentUser
                Clicky.create(req.body, (err, anotherClick)=> {
                    res.redirect('/')
                })
            })   
        }else{
             req.body.user = req.body.to
             req.body.tags += `,to:${req.body.to},from:${req.session.currentUser}`
             req.body.tags = req.body.tags.split(",")
             req.body.tags = req.body.tags.map(s => s.trim())
             Clicky.create(req.body, (err, newClick) =>{
                req.body.user = req.session.currentUser
                Clicky.create(req.body, (err, anotherClick) =>{
                    res.redirect('/')
                })
             })  
            }
        })
})

module.exports = send