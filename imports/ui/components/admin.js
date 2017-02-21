import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Roles } from 'meteor/alanning:roles'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let {
      isAdmin
    } = this.props

    if (isAdmin) {
      return (
        <div className="admin-area">
          {this.props.children}
        </div>
      )
    } else {
      return null
    }
  }
}

export default createContainer(() => {
  let currentUser = Meteor.user()

  if (currentUser) {
    return {
      isAdmin: Roles.userIsInRole(currentUser._id, 'admin'),
      loading: false
    }
  }

  return { loading: true }
}, Admin)
