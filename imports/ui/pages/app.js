import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default (props) => {
  return (
    <div className="draft-js-meteor-app">
      <MuiThemeProvider>
        {props.children}
      </MuiThemeProvider>
    </div>
  )
}
