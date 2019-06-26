import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as usersActions from '../actions/usersActions';
import * as postsActions from '../actions/postsActions';

class Publications extends Component {
    async componentDidMount(){
        if(!this.props.usersReducer.users.lenght){
            await this.props.getAllUsers()
        }
        this.props.getUserPosts(this.props.match.params.key)
    }

    render(){
        const { key } = this.props.match.params
        console.log(this.props)
        return(
            <div>
                <h1>Publicaciones de</h1>
                {key}
            </div>
        )
    }
}

const mapStateToProps = ( { usersReducer, postsReducer } ) => (
    {
        usersReducer, 
        postsReducer
    }
)

const mapDispatchToProps = {
    ...usersActions,
    ...postsActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Publications)