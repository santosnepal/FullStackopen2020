import React from 'react'
import { connect } from 'react-redux'
import { addAnecdotes } from '../reducers/anecdoteReducer'
import { setnotification } from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {
    const {addAnecdotes,setnotification} = props
    const addAnecdote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        addAnecdotes(anecdote)
        setnotification(`you added ${anecdote}`,5)
        
      }
    
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div>
                <input
                name='anecdote' 
                />
            </div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}
const mapDispatchToProp = {
    addAnecdotes,
    setnotification
}
const NewAnecdoteForm = connect(null,mapDispatchToProp)(AnecdoteForm)
export default NewAnecdoteForm