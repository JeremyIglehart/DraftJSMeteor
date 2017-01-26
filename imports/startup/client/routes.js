import { Meteor } from 'meteor/meteor'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Accounts, STATES } from 'meteor/std:accounts-ui';

import App from '../../ui/pages/app'

import MyEditor from '../../ui/layouts/editor'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MyEditor} />
      <Route path="/signin" component={() => <Accounts.ui.LoginForm />} />
      <Route path="/signup" component={() => <Accounts.ui.LoginForm formState={STATES.SIGN_UP} />} />
    </Route>
  </Router>
)

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.draft-js-meteor-container'))
})
