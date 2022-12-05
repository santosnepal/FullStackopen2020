const initialState = ''
let howMuch = 0
const reducer = (state=initialState,action) =>{
    switch(action.type){
        case 'SET':
            return action.data
        case 'REMOVE':
            return ''
        default:
            return state
    }
}
export default reducer
export const setnotification = (message,time) =>{
    return async dispatch => {
        clearTimeout(howMuch)
        dispatch({
            type:'SET',
            data:message
        })
      howMuch =   setTimeout(() => {
            dispatch({
                type:'REMOVE'
            })
        }, time*1000)
    }
    
}
