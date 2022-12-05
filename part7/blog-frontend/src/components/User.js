import React from 'react'
import { useParams } from 'react-router'
const User = (props) => {
  const id = useParams().id
  const user = props.user.find(who => who._id===id)
  return(
    <div>
      <h2>{user.name}</h2>
      {user.blog.map(who => <p key={who._id}>{who.title}</p>)}
    </div>

  )
}
export default User