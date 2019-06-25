import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as usersActions from '../actions/usersActions';

class Users extends Component {

  createRows = () =>
    this.props.users.map( user => (
      <tr key={user.id}>
        <td> {user.name} </td>
        <td> {user.email} </td>
        <td> {user.website} </td>
      </tr>
		))
    
  componentDidMount(){
    this.props.getAll()
  }
  
  render() {
    return (
      <div className="margin">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>
            {this.createRows()}
          </tbody>
        </table>
      </div>
    )
  }


	
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer
}

export default connect(mapStateToProps, usersActions)(Users);
