import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/icons.css'

const Table = (props) => {

	const createRows = () => props.users.map((user, key) => (
		<tr key={user.id}>
			<td > {user.name} </td>
			<td> {user.email} </td>
			<td> {user.website} </td>
			<td>
				<Link to={`/posts/${key}`}>
					<div className="eye-solid icon"></div>
				</Link>
			</td>
		</tr>
	))

	return (
		<table className="table table-striped table-hover">
			<thead className="thead-dark" >
				<tr>
					<th scope="col">Nombre</th>
					<th scope="col">Correo</th>
					<th scope="col">Enlace</th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				{createRows()}
			</tbody>
		</table>
	)
}

const mapStateToProps = reducers => reducers.usersReducer

export default connect(mapStateToProps)(Table)