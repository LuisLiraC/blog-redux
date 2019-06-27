import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Users from './Users'
import Layout from './Layout'
import Posts from './Posts'
import Tasks from './Tasks'
import NewTask from './NewTask'

const App = () => (
	<BrowserRouter>
		<Layout>
			<Switch>
				<Route exact path="/" component={Users} />
				<Route exact path="/tasks" component={Tasks} />
				<Route exact path="/posts/:key" component={Posts} />
				<Route exact path="/tasks/save" component={NewTask} />
				<Route exact path="/tasks/save/:userId/:taskId" component={NewTask} />
			</Switch>
		</Layout>
	</BrowserRouter>
)

export default App