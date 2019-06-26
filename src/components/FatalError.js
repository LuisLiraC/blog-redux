import React from 'react'
import { connect } from 'react-redux';

const FatalError = (props) => (
    <h2 className="center red">
        {props.error}
    </h2>
)

const mapStateToProps = reducers => reducers.usersReducer

export default connect(mapStateToProps)(FatalError)