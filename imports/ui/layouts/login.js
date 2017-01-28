import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import { Accounts, STATES } from 'meteor/std:accounts-ui';

import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

const iconStyles = {
}

const buttonStyle = {
  margin: 12,
}

class LogIn extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="login-container">

        <Accounts.ui.LoginForm />

        <p>This is a test - do I stay?</p>
      </div>
    )
  }
}

export default createContainer(() => {

  return { loading: true }
}, LogIn)
