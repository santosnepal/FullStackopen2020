import React from 'react'
import './Notifier.css'
const Notification = (props) => {
  const { type,messages }=props
  return(
    <div className={ type }>
      { messages }
    </div>
  )
}
export default Notification