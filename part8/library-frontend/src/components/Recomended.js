import React, { useEffect, useState } from 'react'
import { gql, useQuery} from '@apollo/client'
const queryAllBooks = gql `
query {
  allBooks { 
    title 
    author{
      name
    }
    genres
    published 
  }
}
`
const me = gql `
query {
  who{
    username
    favoriteGenre
  }
}`
const Recommended = (props) => {
  const result = useQuery(queryAllBooks)
  const userresult = useQuery(me)
  // const fg = 'all'
  const fg = !userresult.loading?userresult.data.who.favoriteGenre:'all'
  useEffect(()=>{
    if(!userresult.loading){
      setGenre(fg)
    }
  },[userresult.loading,fg])
  const [genre,setGenre] = useState('')
  if (!props.show) {
    return null
  }
  if(result.loading || userresult.loading){
    return null
  }
  return (
    <div>
      {console.log(userresult)}
      <h2>Filter Books By Favourite Genre {userresult.data.who.favoriteGenre}</h2>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>
              Title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            a.genres.includes(genre)&&<tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>)}
        </tbody>
      </table>
      </div>
  )
}

export default Recommended