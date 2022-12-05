import React from 'react'
const Users = (props) => {
  const { user } =props
  return (
    <div>
      {user.name} Blog created {user.blog.length}
    </div>
  )
}
export default Users