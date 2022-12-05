import React ,{ useState } from 'react'
import login from '../services/login'
const LoginForm = (props) => {
  const { what,who,type,notification } =props
  const [username,setUsername] = useState('')
  const [password,setPassword]= useState('')
  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const response = await login.login(username,password)
      if(response.data.token){
        window.localStorage.setItem('logedinuser',JSON.stringify(response))
        what(true)
        who(response.data.name)
      }
    } catch (error) {
      console.log(error,'hello')
      type('error')
      notification('Username or Password Wrong')
      setTimeout(() => {
        type('')
        notification('')
      },5000)
    }
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">Login</button>
      </form>
    </div>
  )


}
export default LoginForm