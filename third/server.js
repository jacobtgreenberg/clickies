//DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

//CONFIGURATION
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
require('dotenv').config()

//DATABASE
mongoose.connect('mongodb://localhost:27017/clickies' , {useNewUrlParser : true})

//MODELS
const Clicky = require('./models/clickmodel.js');

//CONTROLLERS
const userController = require('./controllers/userscont.js')
app.use('/users', userController)

//ROUTES

//index
app.get('/' , (req, res) => {
    Clicky.find({}, (error, all) => {
        res.render('home.ejs' , {
            complete : all
        })
    })
})

//create
app.post('/', (req, res) => {
    req.body.tags = req.body.tags.split(",")
    req.body.tags = req.body.tags.map(s => s.trim())
    Clicky.create(req.body, (err, newClick) =>{
        res.redirect('/')
    })   
})

//search
app.post('/search' , (req, res) => {
    Clicky.find({tags: req.body.search} ,(err, results) => {
        res.redirect('/')
    })
})

//update
app.put('/:id' , (req, res) => {
    req.body.tags = req.body.tags.split(",")
    req.body.tags = req.body.tags.map(s => s.trim())
    Clicky.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
        res.redirect('/')
    })
})

//cancel
app.post('/cancel', (req, res) => {
    res.redirect('/')
})

//delete
app.delete('/:id' , (req, res) => {
    Clicky.findByIdAndRemove(req.params.id, { useFindAndModify: false}, (err ,data) => {
        res.redirect('/')
    })
})




















//SERVER
app.listen(3000)