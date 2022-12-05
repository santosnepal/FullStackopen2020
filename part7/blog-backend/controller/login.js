const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter =  require('express').Router()
const user = require('../models/user')
loginRouter.post('',async(request,response)=>{
    const {username,password} = request.body
    const luser = await user.findOne({username:username})
    if(!luser){
        return response.status(401).json({error:'Invalid Credential'})
    }
    const pcheck = await bcrypt.compare(password,luser.password)
    if(!pcheck){
        return response.status(401).json({error:'Invalid Credential'})
    }
    const userT = {
        username:luser.username,
        id:luser.id
    }
    const token = jwt.sign(userT,process.env.SECRET)
    return response.status(200).send({token,username:luser.username,name:luser.name})
})
module.exports = loginRouter