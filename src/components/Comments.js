import React from 'react'
import {connect} from 'react-redux'
import Spinner from '../components/Spinner'
import FatalError from '../components/FatalError'

const Comments = (props) => {
    
    if(props.com_error) return <FatalError message={props.com_error}/>
    if(props.com_loading && !props.comments.length) return <Spinner/>

    const renderComments = () => (
        props.comments.map( (comment) => (
            <li key={comment.id}>
                <b><u>{comment.email}</u></b>
                <p className="mb-0">{comment.body}</p>
            </li>
        ))
    )
    
    return (
        <ul>
            {renderComments()}
        </ul>
    )
}

const mapStateToProps = reducers => reducers.postsReducer

export default connect(mapStateToProps)(Comments)