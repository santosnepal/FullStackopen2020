import React from 'react'
import { connect } from 'react-redux'
import { handelFilterKey } from '../reducers/filterReducer'
const Filter = ({handelFilterKey}) =>{
    const handleChange = (e) => {
        const newfilter = e.target.value
        handelFilterKey(newfilter)
    }
    const style = {
        marginBottom:10
    }
    return (
        <div style={style}>
            Filter <input onChange={handleChange} />
        </div>
    )
}
const newFilter  = connect(null,{handelFilterKey})(Filter)
export default newFilter