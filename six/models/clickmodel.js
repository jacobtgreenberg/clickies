const mongoose = require('mongoose')

const clickySchema = new mongoose.Schema ({
    text: String,
    tags: Array,
    user: String,
    inbox: {type: Boolean, default: false}
})

const Clicky = mongoose.model('clicky', clickySchema)

module.exports = Clicky