const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

test('username validation for length',async()=>{
    const newuser = {
        name:'testuser',
        username:'t',
        password:'testpassword'
    }
   await api.post('/api/user')
    .send(newuser)
    .expect(400)
},100000)
test('password validation for length',async()=>{
    const newuser = {
        name:'testuser',
        username:'testusername',
        password:'t'
    }
   await api.post('/api/user')
    .send(newuser)
    .expect(400)
})
afterAll(()=>{
    mongoose.connection.close()
})