
const mongoose = require('mongoose')
const uniquevalidator = require('mongoose-unique-validator')
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String,
        required: true,
        minlength: 3
    }
})
schema.plugin(uniquevalidator)
module.exports = mongoose.model('User', schema)