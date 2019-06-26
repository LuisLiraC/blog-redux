import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Users from './Users'
import Layout from './Layout';
import Posts from './Posts';

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
				<Route exact path="/posts/:key" component={Posts} />
			</Switch>
		</Layout>
	</BrowserRouter>
)

export default App