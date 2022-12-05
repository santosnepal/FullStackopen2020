const mongoose = require('mongoose')
const blogModel = new mongoose.Schema({
    title:String,
    author:String,
    url:String,
    like:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'User'
    }
})

module.exports = mongoose.model('Blog',blogModel)