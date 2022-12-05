  import service from '../services/anecdoteService'
  const getId = () => (100000 * Math.random()).toFixed(0)
  const reducer =  (state = [], action) => {
    switch (action.type){
      case 'INITS':{
        const newstate = action.data
        return newstate
      }
      case 'VOTE':{
        const newstate = state.map((prevstate) => {
          if(prevstate.id===action.data.id){
          return  {...prevstate,
                  votes:prevstate.votes+1}
          }
          return prevstate
        })
        return newstate
      }
      case 'ADD':{
        const newstate= state.concat(action.data)
        return newstate
      }
      
    }
  
    return state
  }
  export const votes = (id) => {
    return async dispatch => {
      const response = await service.vote(id)
      dispatch(
        {
          type:'VOTE',
          data:{id}
          }
      )
    }
    
  }
  export const addAnecdotes = (anecdote) =>{
    return async dispatch => {
      const newanecdote = await service.addNew({
        content:anecdote,
        id:getId(),
        votes:0
      })
      dispatch({
        type:'ADD',
        data:newanecdote
      })
    }
  }
  export const initializes =  (anecdote) => {
    return async dispatch => {
      const anecdotes = await service.getAll()
      dispatch({
        type:'INITS',
        data:anecdotes
      })
    }
    
  }
  export default reducer