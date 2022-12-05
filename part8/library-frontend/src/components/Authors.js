import React, { useState } from 'react'
import { gql, useMutation, useQuery} from '@apollo/client'
const queryAllAuthor = gql `
query {
  allAuthor {
    name
    born
    id
  }
}
`
const queryEditAuthor = gql `
  mutation editAuthor
  (
    $name: String!, $setBornTo: Int!
  ) {
    editAuthor(name: $name, setBornTo: $setBornTo){
      born
      name
    }
}
`
const Authors = (props) => {
  const result = useQuery(queryAllAuthor)
  const [setBornTo,setByear] = useState('')
  const [updateAuthor] = useMutation(queryEditAuthor,{
    refetchQueries:[{query:queryAllAuthor}],
    onError:(error)=>{
      console.log(JSON.stringify(error, null, 2));
    }
  })
  const saveuByear =async (e) =>{
    e.preventDefault()
    const name = e.target.name.value
    console.log(name,'name')
    console.log(setBornTo)
    const res = await updateAuthor({variables:{name,setBornTo}})
    console.log(res,'from')
  }
  if (!props.show) {
    return null
  }
  if(result.loading){
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthor?result.data.allAuthor.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              {/* <td>{a.bookCount}</td> */}
            </tr>
          ):null}
        </tbody>
      </table>
     { props.token && <div>
      <h2>Set Birth year for the author</h2>
          <form onSubmit={saveuByear}>
            <select name='authorname' id='name'>
              {result.data.allAuthor.map(author => (
                <option key = {author.id} value = {author.name}>
                {author.name}
                </option>
              ))}
            </select>
            <input type="number" value = {setBornTo} onChange={(e)=>setByear(parseInt(e.target.value))}/>
            <button type="submit">Save Birth year</button>
          </form></div>}
    </div>
  )
}

export default Authors
