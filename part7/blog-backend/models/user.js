const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    blog:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
        }
    ]
})

module.exports = mongoose.model('User',UserSchema)