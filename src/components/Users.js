import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import FatalError from './FatalError'
import Table from './Table'

import * as usersActions from '../actions/usersActions'

class Users extends Component {

	componentDidMount() {
		if(!this.props.users.length) {
			this.props.getAllUsers()
		}
	}

	renderContent = () => {

		if (this.props.loading) {
			return <Spinner />
		}

		if (this.props.error) {
			return <FatalError message={this.props.error } />
		}

		return <Table />

	}

	render() {
		return (
			<div>
				<h1>Usuarios</h1>
				{this.renderContent()}
			</div>
		)
	}



}

const mapStateToProps = reducers => reducers.usersReducer

export default connect(mapStateToProps, usersActions)(Users)
