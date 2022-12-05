const userReducer = (state = null,action) => {
  switch(action.type){
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}
export const adds = (user) => {
  return {
    type:'LOGIN',
    data:user
  }
}
export const logouts = () => {
  return{
    type:'LOGOUT'
  }
}
export default userReducer