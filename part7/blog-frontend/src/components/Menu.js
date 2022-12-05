import React from 'react'
import { connect, useDispatch  } from 'react-redux'
import { logouts } from '../reducers/userReducer'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
const Menu = (props) => {
  const dispatch = useDispatch()
  if(!props.user){
    return(
      null
    )
  }
  const { username } = props.user
  const logOutHandler =() => {
    window.localStorage.removeItem('logedinuser')
    props.ls(false)
    dispatch(logouts())
  }
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Nav className='me-auto'>
          <Navbar.Brand>{`${username} is LoggedIn  `}</Navbar.Brand>
          <Nav.Link href='/'>Home </Nav.Link>
          <Nav.Link href='/blogs'>Blogs </Nav.Link>
          <Nav.Link href='/users'>Users  </Nav.Link>
          <Button varianr ='outline-info' id="logout"onClick={logOutHandler}>LogOut</Button>
        </Nav>
      </Container>
    </Navbar>
  )
}
const mapStateToProps = (state) => ({
  user:state.user
})
const NewMenu = connect(mapStateToProps)(Menu)
export default NewMenu