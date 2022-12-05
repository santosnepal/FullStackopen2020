import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import Notification from './components/Notifier'
import { connect, useDispatch } from 'react-redux'
import { inits } from './reducers/blogReducer'
import { adds } from './reducers/userReducer'
import Users from './components/Users'
import { setusers } from './reducers/usersReducer'
import { Switch,Route, BrowserRouter as Router, Link } from 'react-router-dom'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { Container } from 'react-bootstrap'
const App = (props) => {
  const dispatch = useDispatch()
  const [lstate,setLstate] = useState(false)
  useEffect(() => {
    const userunparsed = window.localStorage.getItem('logedinuser')
    if(userunparsed){
      const userprsed = JSON.parse(userunparsed)
      setLstate(true)
      dispatch(adds(userprsed.data))
    }
    dispatch(inits())
    dispatch(setusers())
  }, [])

  if(!lstate){
    return(
      <div>
        <Notification />
        <LoginForm what={setLstate}  />
      </div>
    )
  }
  else{

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Notification />
              <Menu ls={setLstate}/>
              <br/>
              <Container>
                <AddBlog />
              </Container>
            </Route>
            <Route path='/user/:id'>
              <Menu ls={setLstate}/>
              <User user={props.users}/>
            </Route>
            <Route path='/blog/:id'>
              <Menu ls={setLstate}/>
              <Blog blog = {props.blogs}/>
            </Route>
            <Route exact path='/blogs'>
              <Menu ls ={setLstate}/>
              <h2>blogs</h2>
              {props.blogs.map(blog =>
                <Link to = {`/blog/${blog._id}`} key={blog._id} > <Blogs key={blog._id} title={blog.title} author={blog.author}  /></Link>
              )}
            </Route>
            <Route exact path='/users'>
              <Menu ls={setLstate}/>
              <h2>Users In the System</h2>
              {props.users.map(user =>
                <Link key={user._id} to ={`/user/${user._id}`}> <Users key={user._id } user={user}/> </Link>
              )}
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  blogs:state.blog,
  users:state.users
})
const NewApp = connect(mapStateToProps)(App)
export default NewApp