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

send.post('/upsend/:id',(req, res) => {
    Clicky.find({user: req.session.currentUser}, (error, all) => {
        res.render('upsend.ejs' , {
            content : req.body,
            complete : all,
            id : req.params.id
        })
    })
})

send.post('/commit',(req, res) => {
    console.log(req.body.tags.length)
    User.findOne({username: req.body.to}, (error, foundUser)=>{
        if(foundUser.username === undefined){
            res.send('no such person')
        }else if(req.body.to === 'PUBLIC'){
            req.body.user = req.body.to
            if(req.body.tags.length === 0){
                req.body.tags = 'PUBLIC'
            }else{
                req.body.tags += ',PUBLIC'
                req.body.tags = req.body.tags.split(",")
                req.body.tags = req.body.tags.map(s => s.trim())
            }
            Clicky.create(req.body, (err, newClick) =>{
                req.body.user = req.session.currentUser
                Clicky.create(req.body, (err, anotherClick)=> {
                    res.redirect('/')
                })
            })   
        }else{
             req.body.user = req.body.to
             req.body.inbox = true
             if(req.body.tags.length === 0){
                 req.body.tags = `from:${req.session.currentUser}`
             }else{
                req.body.tags += `,from:${req.session.currentUser}`
                req.body.tags = req.body.tags.split(",")
                req.body.tags = req.body.tags.map(s => s.trim())
             }
             Clicky.create(req.body, (err, newClick) =>{
                req.body.user = req.session.currentUser
                req.body.inbox = false
                if(req.body.tags === `from:${req.session.currentUser}`){
                    req.body.tags = `to:${req.body.to}`
                }else{
                    req.body.tags.splice(req.body.tags.length - 1, 1 , `to:${req.body.to}`)
                }
                Clicky.create(req.body, (err, anotherClick) =>{
                    res.redirect('/')
                })
             })  
            }
        })
})

send.post('/upcommit/:id',(req, res) => {
    User.findOne({username: req.body.to}, (error, foundUser)=>{
        console.log(req.body)
        if(foundUser.username === undefined){
            res.send('no such person')
        }else if(req.body.to === 'PUBLIC'){
            req.body.user = req.body.to
            if(req.body.tags.length === 0){
                req.body.tags = 'PUBLIC'
            }else{
            req.body.tags += ',PUBLIC'
            req.body.tags = req.body.tags.split(",")
            req.body.tags = req.body.tags.map(s => s.trim())
            }
            Clicky.create(req.body, (err, newClick) =>{
                req.body.user = req.session.currentUser
                Clicky.findByIdAndUpdate(req.params.id, {tags: req.body.tags} , (err, anotherClick)=> {
                    res.redirect('/')
                })
            })   
        }else{
             req.body.user = req.body.to
             req.body.inbox = true
             if(req.body.tags.length === 0){
                 req.body.tags =`from:${req.session.currentUser}`
             }else{
                req.body.tags += `,from:${req.session.currentUser}`
                req.body.tags = req.body.tags.split(",")
                req.body.tags = req.body.tags.map(s => s.trim())
             }
             Clicky.create(req.body, (err, newClick) =>{
                if(req.body.tags === `from:${req.session.currentUser}`){
                    req.body.tags = `to:${req.body.to}`
                }else{
                    console.log(req.body.tags.length)
                    console.log(req.body.tags)
                    req.body.tags.splice(req.body.tags.length - 1, 1 , `to:${req.body.to}`)
                }
                Clicky.findByIdAndUpdate(req.params.id, {tags: req.body.tags} , (err, anotherClick) =>{
                    res.redirect('/')
                })
             })  
            }
        })
})

module.exports = send