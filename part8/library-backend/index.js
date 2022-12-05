const { ApolloServer,UserInputError, gql,AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const uniquevalidator = require('mongoose-unique-validator')
require('dotenv').config()
const Book = require('./models/BookModel')
const Author = require('./models/AuthorModel')
const User = require('./models/UserModel')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const passkey = process.env.PASSWORD
const MONGODB_URI = process.env.MONGODB_URI
const jwtkey = process.env.SECRET
mongoose.connect(MONGODB_URI,{useNewUrlParser:true})
.then(()=>{
  console.log('connected to Mongo DB')
})
.catch((error)=>{
  console.log(error.message)
})
const typeDefs = gql`
  type Book {
    title:String!
    published:Int!
    author:Author!
    id:ID!
    genres:[String!]
  }
  type Query {
    bookCount:Int!
    allBooks(author:String,genre:String): [Book!]!
    authorCount:Int!
    allAuthor:[Author!]!
    who:User
  }
  type Mutation {
    addBook(
      title:String!
      author:String!
      published:Int
      genres:[String!]!
    ):Book
    editAuthor(name:String,setBornTo:Int):Author
    defineuser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    
    
  }
  type Subscription {
    addBook: Book!
  }
 
  type Author {
    name:String!
    id:ID!
    born:Int
    bookCount:Int
  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount : () => Author.collection.countDocuments(),
    allBooks : async  (root,args) => {
      if(!args.author && !args.genre){
        const allbook = await  Book.find({}).populate('author')
        console.log(allbook)
        return allbook
      }
      if(args.author&&!args.genre){
        return books.filter(book=>book.author===args.author)
      }
      if(args.genre &&!args.author){
        const books= await Book.find({})
        return books.filter(book => {
         return book.genres.find(genre => genre===args.genre)
        })
      }
      const newlist =  books.filter(book => {
        if(book.author===args.author){
         if(book.genres.find(genre => genre===args.genre)){
           return book
         }
        }
      })
      return newlist
    },
    allAuthor :async  () => { 
      const allauthor = await Author.find({})
      return allauthor
  },
    who:(root,args,context) => {
      return context.currentUser
    }
},
  Mutation:{
    addBook:async (root,args,context) => {
      const newbooks = {...args}
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const findAuthor = await Author.findOne({name: args.author})
      if(findAuthor){
        const books = new Book({...args,author:findAuthor})
        try {
         const res =  await books.save()
         const which = await (await Book.findOne({title:args.title})).populate('author')
         console.log(res)
         return which
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs:args
          })
        }
      }
      const addedAuthor = new Author({
        "name":args.author
      })
      try {
        await addedAuthor.save()
        const findAuthor = await Author.findOne({name: args.author})
        const books = new Book({...args,author:findAuthor})
        const res = await books.save()
        console.log(res,'res')
      } catch (error) {
        console.log(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const which = await (await Book.findOne({title:args.title})).populate('author')
      pubsub.publish('BOOK_ADDED', { addBook: which })
      return which

    },
    
    editAuthor:async (root,args,context) => {
      const whose = await Author.findOne({name:args.name})
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      console.log(whose)
      if(!whose){
        return null
      }
      whose.born = args.setBornTo
      await whose.save()
      return whose
    },
    defineuser: (root, args) => {
      const user = new User({ username: args.username,  favoriteGenre: args.favoriteGenre})
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== passkey ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, jwtkey) }
    },
  
  },
  Subscription: {
    addBook: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {    
    const auth = req ? req.headers.authorization : null    
    if (auth && auth.toLowerCase().startsWith('bearer ')) {      
      const decodedToken = jwt.verify(        
        auth.substring(7), jwtkey      
        )      
        const currentUser = await User.findById(decodedToken.id)   
        return { currentUser }    
      }  
    }
})

server.listen().then(({ url ,subscriptionsUrl}) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
