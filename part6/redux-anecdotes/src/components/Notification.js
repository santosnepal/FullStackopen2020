import { connect } from 'react-redux'
import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={notification!==''?style:null}>
      {notification}
    </div>
  )
}
const mapStateToProp = (state) => ({
  notification:state.notification
})
const NewNotification = connect(mapStateToProp)(Notification)
export default NewNotification