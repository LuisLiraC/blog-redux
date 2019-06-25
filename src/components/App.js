import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Users from './Users/Users'
import Layout from './Layout';

const Tasks = () => (
  <div>
    Tasks
  </div>
)

const App = () => (
  <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Users} /> 
          <Route exact path="/tasks" component={Tasks} /> 
        </Switch>
      </Layout>
  </BrowserRouter>
)

export default App