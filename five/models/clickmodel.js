const mongoose = require('mongoose')

const clickySchema = new mongoose.Schema ({
    text: String,
    tags: Array,
    user: String
})

const Clicky = mongoose.model('clicky', clickySchema)

module.exports = Clicky