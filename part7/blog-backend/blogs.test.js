const listhelper = require('./utils/list_helper')
test('dummy returns one',()=>{
const blogs =[
    {
        "tilte":"Hello world 1",
        "author":"Suroz Suroz",
        "url":"http://localhost:3001/api/blogs",
        "likes":1
    },
    {
        "tilte":"Hello world 2",
        "author":"Suroz Suroz",
        "url":"http://localhost:3001/api/blogs",
        "likes":1
    },
    {
        "tilte":"Hello world 3",
        "author":"Suroz Suroz",
        "url":"http://localhost:3001/api/blogs",
        "likes":1
    },
    {
        "tilte":"Hello world 4",
        "author":"Suroz Suroz",
        "url":"http://localhost:3001/api/blogs",
        "likes":1
    }
]

    const result = listhelper.dummy(blogs)
    expect(result).toBe(1)
    

})
describe('Total Likes',()=>{
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 25,
          __v: 0
        }
      ]
    test('when only one qual to thats like',()=>{
        const result = listhelper.totalLikes(listWithOneBlog)
        expect(result).toBe(25)
    })
})
describe('Favourite Blog,',() =>{
    const blogs =[
        {
            "tilte":"Hello world 1",
            "author":"Suroz Suroz",
            "url":"http://localhost:3001/api/blogs",
            "likes":1
        },
        {
            "tilte":"Hello world 2",
            "author":"Suroz Suroz",
            "url":"http://localhost:3001/api/blogs",
            "likes":1
        },
        {
            "tilte":"Hello world 3",
            "author":"Suroz Suroz",
            "url":"http://localhost:3001/api/blogs",
            "likes":19
        },
        {
            "tilte":"Hello world 4",
            "author":"Suroz Suroz",
            "url":"http://localhost:3001/api/blogs",
            "likes":1
        }
    ]
    test('return fav blog',()=>{
        const result = listhelper.favoriteBlog(blogs)
        expect(result).toEqual([{
            "tilte":"Hello world 3",
            "author":"Suroz Suroz",
            "url":"http://localhost:3001/api/blogs",
            "likes":19
        }])
    })

})