import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/filter'
import Notification from './components/Notification'
const App =  () => {
 return (
    <>
    <h1><Notification/></h1>
    <Filter/>
    <AnecdoteList/>
    <AnecdoteForm/>
    </>
  )
}

export default App