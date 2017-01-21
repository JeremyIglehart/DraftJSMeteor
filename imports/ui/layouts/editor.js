import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import {Editor, EditorState} from 'draft-js';

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return (
      <div className="editor-container">
        <h1>DraftJS and Meteor Editor:</h1>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}

export default createContainer(() => {

  return { loading: true }
}, MyEditor)
