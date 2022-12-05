import React from 'react'
import '../App.css'
const Notification = ({messages})=>{
    const {type,message}=messages
    
    return(
        <div className={type}>
            {message}
        </div>
    )
}
export default Notification