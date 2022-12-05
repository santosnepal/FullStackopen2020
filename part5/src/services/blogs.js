import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const addNew = async (title,author,url,like) => {
  const token = JSON.parse(localStorage.getItem('logedinuser'))
  const config={
    headers:{
      'Authorization':`bearer ${token.data.token}`,
    }
  }
  const newBlog={
    title:title,
    author:author,
    url:url,
    like:like
  }
  try {
    const response = await axios.post(`${baseUrl}`,newBlog,config)
    return response
  } catch (error) {
    return error
  }
}
const like = async (blog) => {
  blog.like=blog.like+1
  try {
    await axios.put(`${baseUrl}/${blog._id}`,blog)

  } catch (error) {
    return error
  }
}
const deleteblog =async (id) => {
  const token = JSON.parse(localStorage.getItem('logedinuser'))
  const config={
    headers:{
      'Authorization':`bearer ${token.data.token}`,
    }
  }
  try {
    const response =  await axios.delete(`${baseUrl}/${id}`,config)
    return response
  } catch (error) {
    return error
  }
}
const blog = {
  getAll,
  addNew,
  like,
  deleteblog
}

export default blog