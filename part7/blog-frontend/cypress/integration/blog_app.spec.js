// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:

import blog from "../../src/services/blogs"

// https://on.cypress.io/writing-first-test
describe('Blog app',function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const testuser = {
            username:"tester",
            password:"testerpassword",
            name:'tester'
        }
        cy.request('POST','http://localhost:3001/api/user',testuser)
        cy.visit('http://localhost:3000')
    })
    it('Login page is shown',function(){
        cy.contains('Login')
    })
    it('login with correct user',function(){
        cy.get('#username').type('tester')
        cy.get('#password').type('testerpassword')
        cy.get('#login-btn').click()
        cy.contains('tester is Logged in')
    })
    it('loger can post a blog',function(){
        cy.get('#username').type('tester')
        cy.get('#password').type('testerpassword')
        cy.get('#login-btn').click()
        cy.get('#addblog').click()
        cy.get('#title').type('testing blog')
        cy.get('#author').type('tester author')
        cy.get('#url').type('hello')
        cy.get('#create').click()
        cy.contains('New Blog testing blog by tester author is added succesfully')
        cy.get('#logout').click()
    })
   
})
describe('for like',function(){
    beforeEach(function(){
        window.localStorage.removeItem('logedinuser')
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const testuser = {
            username:"tester",
            password:"testerpassword",
            name:'tester'
        }
        cy.request('POST','http://localhost:3001/api/user',testuser)
        cy.visit('http://localhost:3000')
        cy.get('#username').type('tester')
        cy.get('#password').type('testerpassword')
        cy.get('#login-btn').click()
        cy.get('#addblog').click()
        cy.get('#title').type('testing blog')
        cy.get('#author').type('tester author')
        cy.get('#url').type('hello')
        cy.get('#create').click()
    })
    it('you can like',function(){
        cy.get('#sd').click()
        cy.get('#like').click()
        cy.contains('likes : 1')
    })
    it('you can delete it ',function(){
        cy.get('#sd').click()
        cy.get('#delete').click()
        cy.should('not.contain','testing blog tester author')
    })
})
describe('for ordering of blog',function(){
    beforeEach(function(){
        window.localStorage.removeItem('logedinuser')
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const testuser = {
            username:"tester",
            password:"testerpassword",
            name:'tester'
        }
        cy.request('POST','http://localhost:3001/api/user',testuser)
        cy.visit('http://localhost:3000')
        cy.get('#username').type('tester')
        cy.get('#password').type('testerpassword')
        cy.get('#login-btn').click()
        cy.get('#addblog').click()
        cy.get('#title').type('testing blog1')
        cy.get('#author').type('1')
        cy.get('#like').type('5')
        cy.get('#url').type('hello')
        cy.get('#create').click()
        cy.get('#addblog').click()
        cy.get('#title').type('testing blog2')
        cy.get('#author').type('2')
        cy.get('#like').type('8')
        cy.get('#url').type('hello')
        cy.get('#create').click()
        cy.get('#addblog').click()
        cy.get('#title').type('testing blog3')
        cy.get('#author').type('3')
        cy.get('#like').type('7')
        cy.get('#url').type('hello')
        cy.get('#create').click()
    })
    it('blog should be avilable as of like',function(){
        console.log(cy.get('#list'))
        cy.get('#list').then(blog => {
            cy.wrap(blog[0]).contains('testing blog2 2 Show')
            cy.wrap(blog[1]).contains('testing blog3 3 Show')
            cy.wrap(blog[2]).contains('testing blog1 1 Show')
            })
        
    })
})