import axios from 'axios'
const uri = 'http://localhost:3001/api/user'
export const getAll = async () => {
  try {
    const res = await axios.get(uri)
    return res.data
  }catch (error) {
    return error
  }
}