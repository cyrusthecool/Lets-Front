import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Groups from './components/Groups'
import Group from './components/Group'
import Home from './components/Home'
import NewGroup from './components/NewGroup'
import EditGroup from './components/EditGroup'

import Event from './components/Event'
import Events from './components/Events'
import EditEvent from './components/EditEvent'
import Newevent from './components/Newevent'

import User from './components/User'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

export const history = createBrowserHistory()

const Routes = (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/groups' component={Groups} />
        <Route exact path='/newgroup' component={NewGroup} />
        <Route exact path='/groups/:id' component={Group} />
        <Route exact path='/groups/:id/edit' component={EditGroup} />
        <Route exact path='/events' component={Events} />
        <Route exact path='/newevent' component={Newevent} />
        <Route exact path='/events/:id' component={Event} />
        <Route exact path='/editevent/:id' component={EditEvent} />
        <Route exact path='/user/:id' component={User} />
        <Route exact path='/signin' component={ SignIn } />
        <Route exact path='/signup' component={ SignUp } />
      </Switch>

    </div>
  </Router>
)

export default Routes
