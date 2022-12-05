import axios from 'axios'
const base_url = 'http://localhost:3001/anecdotes'
const getAll = async ()=>{
    const response = await axios.get(base_url)
    return response.data
}
const addNew = async (anecdote) => {
    const response = await axios.post(base_url,anecdote)
    return response.data

}
const vote = async (id) => {
    const response = await axios.get(`${base_url}/${id}`)
    const whose = response.data
    whose.votes = whose.votes+1
    const res = await axios.put(`${base_url}/${id}`,whose)
    return res.data
}
const service = {
    getAll:getAll,
    addNew:addNew,
    vote:vote
}
export default service