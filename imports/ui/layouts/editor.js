import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

class Editor extends Component {
  constructor(props) {
    super(props)

    this.state = { }
  }
  render() {
    return (
      <div className="editor-container">
        <h1>DraftJS and Meteor Editor</h1>
      </div>
    )
  }
}

export default createContainer(() => {

  return { loading: true }
}, Editor)
