const jwt = require('jsonwebtoken')
const user = require('../models/user')
require('dotenv').config
const tokenExtractor = (request,response,next)=>{
    
    const authorization = request.get('authorization')
    if(authorization&&authorization.toLowerCase().startsWith('bearer')){
        request.token = authorization.substring(7)
    

    }
    else{
        request.token = null
   

    }
    try {
        const decodedtoken = jwt.verify(request.token,process.env.SECRET)
        request.decodedtoken = decodedtoken
    

    } catch (error) {
        request.decodedtoken = null

    }
    next()
}
const userExtractor = async(request,response,next)=>{
    const authorization = request.get('authorization')
    if(authorization&&authorization.toLowerCase().startsWith('bearer')){
        request.token = authorization.substring(7)
    

    }
    else{
        request.token = null
   

    }
    try {
        const decodedtoken = jwt.verify(request.token,process.env.SECRET)
        const uid =  decodedtoken.id
        try {
            const who = await user.findById(uid)
            request.user=who.id
        } catch (error) {
            request.user=null
        }
    

    } catch (error) {
        request.decodedtoken = null

    }
    next()
}
module.exports = {
    tokenExtractor,
    userExtractor
}