const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')
userRouter.post('',async(request,response)=>{
    const {name,username,password} = request.body
    //logger.info("Helo bro")
    if(!username||!password) {
        return response.status(400).json({error:'Please provide username and password at least'})
    }
    if(username.length<3||password.length<3){
        return response.status(400).json({error:'Password must be at least 3 character long'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)
    const user = new User({
        username:username,
        name:name,
        password:passwordHash

    })
    try {
        const savedUser = await user.save()
        return response.status(200).json(savedUser)
    } catch (error) {

        logger.error(error.message)
        return response.status(500).send(`${error.message}`)
    }
})
userRouter.get('',async(request,response)=>{
    try {
       const users = await User.find({}).populate('blog',{title:1,author:1,url:1})
       return response.status(200).json(users)

    } catch (error) {
        logger.error(error.message)
        return response.status(500).send('Internal Server Error')
        
    }
})
module.exports = userRouter