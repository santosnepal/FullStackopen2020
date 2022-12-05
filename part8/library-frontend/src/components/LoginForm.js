import React, { useState,  } from 'react'
import { useMutation,gql } from '@apollo/client'
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
}
`

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login ] = useMutation(LOGIN, {    
      onError: (error) => {
       props.notifier(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }
//   if(props.token!==null){
//     //   props.settoken(null)
//     console.log('i am logged in',props.token)
//     props.settoken(null)
//     return null
//   }
    
  const submit = async (event) => {
    event.preventDefault()
    
    const result = await login({ variables: { username, password } })
    if ( result.data ) {      
        const token = result.data.login.value         
        props.settoken(token)   
        localStorage.setItem('library-user-token', token) 
        props.setPage('authors')
      }  
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm