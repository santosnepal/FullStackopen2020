const dummy = (blogs)=>{
    return 1
}
const totalLikes=(blogs)=>{
    return blogs.reduce((initiallike,blogs)=>(initiallike +=blogs.likes),0)
}
const favoriteBlog=(blogs)=>{
    const likes = blogs.map(blog=>blog.likes)
    const max = Math.max(...likes)
    const fav = blogs.filter(blog=>max===blog.likes)
    return fav
}
module.exports={
    dummy,
    totalLikes,
    favoriteBlog
}