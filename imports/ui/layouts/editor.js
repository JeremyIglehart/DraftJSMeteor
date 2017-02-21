import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Roles } from 'meteor/alanning:roles'
import {
          CompositeDecorator,
          ContentBlock,
          ContentState,
          Editor,
          EditorState,
          Entity,
          convertFromHTML,
          convertToRaw,
          RichUtils
        } from 'draft-js'

import { Accounts, STATES } from 'meteor/std:accounts-ui';

import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

import Admin from '../components/admin'

const iconStyles = {
}

const buttonStyle = {
  margin: 12,
}

class MyEditor extends Component {
  constructor(props) {
    super(props)

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      }
    ])

    const sampleMarkup =
      '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
      '<a href="http://www.facebook.com">Example link</a>'

    const blocksFromHTML = convertFromHTML(sampleMarkup)
    const state = ContentState.createFromBlockArray(blocksFromHTML)

    this.state = {
      editorState: EditorState.createWithContent(
        state,
        decorator,
      ),
    }
    this.onChange = (editorState) => this.setState({editorState})
  }
  logState() {
    const content = this.state.editorState.getCurrentContent()
    console.log(convertToRaw(content))
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }
  render() {
    let {
      isAdmin
    } = this.props

    return (
      <div className="editor-container">
        <h1>DraftJS and Meteor Editor:</h1>
        <IconButton onClick={this._onBoldClick.bind(this)} touch={true} tooltip="Format Bold" tooltipPosition="top-right">
          <FontIcon className="material-icons" style={iconStyles}>format_bold</FontIcon>
        </IconButton>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand.bind(this)}
          readOnly={!isAdmin}
          />
        <RaisedButton label="Log Editor State to Console" onClick={this.logState.bind(this)} primary={true} style={buttonStyle} />

        <Admin>
          You are an Admin
        </Admin>
      </div>
    )
  }
}


function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      )
    },
    callback
  )
}

const Link = (props) => {
  const {url} = Entity.get(props.entityKey).getData()
  return (
    <a href={url}>
      {props.children}
    </a>
  )
}

export default createContainer(() => {
  let currentUser = Meteor.user()

  if (currentUser) {
    console.log("currentUser:", currentUser)
    console.log("currentUser is and admin:", Roles.userIsInRole(currentUser._id, 'admin'))
    return {
      isAdmin: Roles.userIsInRole(currentUser._id, 'admin'),
      loading: false
    }
  }

  return { loading: true }
}, MyEditor)
