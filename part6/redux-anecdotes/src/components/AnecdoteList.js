import React,{ useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { votes,initializes } from "../reducers/anecdoteReducer"
import { setnotification } from "../reducers/notificationReducer"
const AnecdoteList =  () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    const sortedanecdoeds = anecdotes.sort((anecdoteA,anecdoteB) =>anecdoteB.votes-anecdoteA.votes)
    const vote = (id) => {
      dispatch(votes(id))
      const newmessage = `You voted ${(anecdotes.find(anc=>anc.id===id)).content}`
      dispatch(setnotification(newmessage,5))
    }
    useEffect(async () => {
      dispatch(initializes())
    },[])
    return (
        <div>
        <h2>Anecdotes</h2>
        {sortedanecdoeds.map(anecdote =>
           anecdote.content.toLowerCase().includes(filter.toLowerCase())&&
           <div key={anecdote.id}>
           <div>
           {anecdote.content}
           </div>
           <div>
           has {anecdote.votes}
           <button onClick={() => vote(anecdote.id)}>vote</button>
           </div>
           </div>
        )}
        </div>
    )
}
export default AnecdoteList