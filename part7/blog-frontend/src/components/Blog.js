import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { commentss, delets, likes } from '../reducers/blogReducer'
import {  Redirect, useParams } from 'react-router'
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const [comment,setComment] = useState('')
  const which = blog.find(blog => blog._id===id)
  if(which===undefined){
    return <Redirect to='/blogs'/>
  }
  const comments = async(e) => {
    e.preventDefault()
    dispatch(commentss(which._id,comment))
    setComment('')
  }
  const token = JSON.parse(localStorage.getItem('logedinuser'))
  const lusername = token.data.username
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const like = async (blog) => {
    dispatch(likes(blog))
  }
  const deleteblog = async (blog) => {
    if(window.confirm(`Do you really wanna delete ${blog.title } by ${blog.author}`)){
      dispatch(delets(blog._id))
    }
  }
  return(
    <div id="list" style={ blogStyle }>
      { which.title } { which.author }
      <br/>
      <div>
        {which.url}
        <br/>
    likes : {which.like}  <button id="like" onClick={() => like(which)}>Like</button>
        <br/>
        <br/>
        <h3>Comments</h3>
        <form onSubmit={comments}>
          <input type = 'text' value={comment} onChange={ (e) => setComment(e.target.value)}/>
          <button type = 'submit'> Add Comment</button>
        </form>
        <ul>
          {which.comment.map(comment =>
            <li key={comment}><p key={comment}>{comment}</p></li>
          )}
        </ul>
        {which.user.username===lusername&&
    <button id="delete" onClick={ () => deleteblog(which) } style={ { color:'red' } }>Delete</button>
        }
      </div>
    </div>
  )
}
Blog.propTypes={
  blog:PropTypes.array.isRequired,
}
export default Blog