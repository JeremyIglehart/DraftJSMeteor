import { Meteor } from 'meteor/meteor'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from '../../ui/pages/app'

import MyEditor from '../../ui/layouts/editor'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MyEditor} />
    </Route>
  </Router>
)

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.draft-js-meteor-container'))
})
