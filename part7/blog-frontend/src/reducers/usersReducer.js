import { getAll } from '../services/users'
import { setnotification } from './notificationReducers'

const usersReducer = (state=[],action) => {
  switch(action.type){
  case 'SETUSERSLIST':
    return action.data
  default:
    return state
  }
}
export const setusers = () => {
  return async dispatch => {
    try {
      const users = await getAll()
      dispatch({
        type:'SETUSERSLIST',
        data:users
      })
    } catch (error) {
      dispatch(setnotification({ message:'sorry couldnt load',type:'error' },5))
    }
  }
}
export default usersReducer