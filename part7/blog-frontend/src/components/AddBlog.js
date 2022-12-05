import React ,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { setnotification } from '../reducers/notificationReducers'
import { adds } from '../reducers/blogReducer'
import { Button,Container,Form } from 'react-bootstrap'
const AddBlog=() => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const [like,setLike] = useState('')
  const [showbf,setShowBf] = useState(false)
  const dispatch = useDispatch()
  const addHandler = async () => {
    //e.preventDefault()
    try {
      dispatch(adds(title,author,url,like))
      dispatch(setnotification({
        message:`New Blog ${title} by ${author} is added succesfully`,
        type:'success'
      },10))
      setTitle('')
      setUrl('')
      setAuthor('')
      setLike('')
      setShowBf(false)
    } catch (error) {
      return error
    }
  }
  if(showbf){
    return(
      <Container >
        <Form onSubmit={addHandler} >
          <h2>Add A New Blog</h2>
          <Form.Group className='mb-3' >
            <Form.Label >Title:   </Form.Label>
            <Form.Control
              id="title"
              name='title'
              type="text"
              value ={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' >
            <Form.Label >Author: </Form.Label>
            <Form.Control
              id="author"
              name='author'
              type='text'
              value ={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label >Url: </Form.Label>
            <Form.Control
              id="url"
              name='url'
              type='text'
              value ={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label >Likes: </Form.Label>
            <Form.Control
              id="like"
              name='like'
              type="number"
              value ={like}
              onChange={(e) => setLike(e.target.value)}
            />
          </Form.Group>
          <Button  id="create" type='submit' onClick={() => addHandler()}>Create </Button>
          <Button variant='danger'onClick={() => setShowBf(false)}>Close </Button>
        </Form>
      </Container>
    )
  }
  else{
    return(
      <Button className='btn' id="addblog" name="addblog"onClick={() => setShowBf(true)}>Create A new Blog </Button>
    )
  }
}
export default AddBlog