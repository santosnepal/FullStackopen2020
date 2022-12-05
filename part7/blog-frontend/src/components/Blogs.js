import React from 'react'
const Blogs = (props) => {
  const { title,author } = props
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {title} by {author}
    </div>
  )
}
export default Blogs