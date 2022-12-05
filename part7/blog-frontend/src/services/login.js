import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async (uname,password) => {
  const  body={
    username:uname,
    password:password
  }
  const request = await axios.post(baseUrl,body)
  return request
}
const loginService ={
  login
}
export default loginService