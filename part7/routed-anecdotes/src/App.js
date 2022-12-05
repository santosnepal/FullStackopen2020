import React, { useState } from 'react'
import { Switch , Route , Link ,BrowserRouter as Router, Redirect, useParams } from 'react-router-dom'
import { useField } from './hooks'
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Link to ={`/anecdotes/${anecdote.id}`} key={anecdote.id}> <li  >{anecdote.content}</li> </Link>)}
    </ul>
  </div>
)
const Anecdote = (props) => {
 const  {anecdoteById,anecdote} = props
 const id = useParams().id
  const which = anecdoteById(id)
  return(
    <div>
      <h2>{which.content} by {which.author}</h2>
      Has {which.votes} Vote
    </div>
  )
}
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.value,
      author:author.value,
      info:info.value,
      votes: 0
    })
    props.setNotification(`${content.value } By ${author.value } is added`)
    setTimeout(() => {
      props.setNotification('')
    },10000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <h3>{props.notification}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={info.onChange} />
        </div>
        <button type='submit'>create</button> <button  type='reset' onClick={()=>{
          content.reset()
          info.reset()
          author.reset()
          }}>Reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
      <Switch>
          <Route exact  path='/'>
           <Menu/>
           <AnecdoteList anecdotes={anecdotes}/>
          </Route>
          <Route path='/about'>
            <Menu/>
            <About/>
          </Route>
          <Route path='/create'>
            <Menu/>
            <CreateNew addNew={addNew} setNotification={setNotification} notification={notification}/>
          </Route>
          <Route path='/anecdotes/:id'>
            <Menu/>
           <Anecdote anecdoteById={anecdoteById} anecdote={anecdotes}/>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App;