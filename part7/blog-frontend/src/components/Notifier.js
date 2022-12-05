import React from 'react'
import { connect } from 'react-redux'
import './Notifier.css'
const Notification = (props) => {
  const { type,message }=props.notification
  return(
    <div className={ type }>
      { message }
    </div>
  )
}
const mapStatetoProp = (state) => ({
  notification:state.notification
})
const NewNotification = connect(mapStatetoProp)(Notification)
export default NewNotification