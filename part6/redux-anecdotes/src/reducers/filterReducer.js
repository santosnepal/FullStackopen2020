const initialState = ''
const reducer = (state=initialState,action) => {
    switch(action.type){
        case 'NEWFILTER':
            return action.data
        default:
            return state
    }

}
export default reducer
export const handelFilterKey = (filterkey) => {
    const action ={
        type:'NEWFILTER',
        data:filterkey
    }
    return action
}