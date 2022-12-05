import blogService from '../services/blogs'
import { setusers } from './usersReducer'
const blogReducer = (state=[],action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  case 'NEW':
    return [...state,action.data]
  case 'LIKE': {
    const newstate = state.filter(fil => fil._id!==action.data)
    newstate.concat(action.data)
    return newstate
  }
  case 'DELETE':{
    const newstate = state.filter(fil => fil._id!==action.data)
    return newstate
  }
  default:
    return state
  }
}
export default blogReducer

export const inits = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedblog = blogs.sort((blog1,blog2) => blog2.like-blog1.like)
    dispatch({
      type:'INIT',
      data:sortedblog
    })
  }
}

export const adds = (title,author,url,like) => {
  return async dispatch => {
    const newblog = await blogService.addNew(title,author,url,like)
    dispatch({
      type:'NEW',
      data:newblog.data
    })
    dispatch(setusers())
  }
}
export const likes = (blog)  => {
  return async dispatch => {
    const response = await blogService.like(blog)
    dispatch({
      type:'LIKE',
      data:response.data
    })
  }
}
export const delets = (id) => {
  return async dispatch => {
    await blogService.deleteblog(id)
    dispatch({
      type:'DELETE',
      data:id
    })
    dispatch(setusers())
  }
}
export const commentss = (id,comment) => {
  return async dispatch => {
    await blogService.comment(comment,id)
    dispatch({
      type:'ADDCOMMENT'
    })
    dispatch(inits())
  }
}