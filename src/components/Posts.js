import React, { Component } from 'react'
import {connect} from 'react-redux'
import Spinner from '../components/Spinner'
import FatalError from '../components/FatalError'
import * as usersActions from '../actions/usersActions'
import * as postsActions from '../actions/postsActions'
import Comments from './Comments'

class Publications extends Component {
    async componentDidMount(){
        const {
			getAllUsers,
			match: { params: { key } },
			getUserPosts
		} = this.props;

        if(!this.props.usersReducer.users.length){
            await getAllUsers()
        }
        if(this.props.usersReducer.error){
            return
        }

        if(!('posts_key' in this.props.usersReducer.users[key])){
            await getUserPosts(key)
        }
    }

    renderUser = () => {
        const { 
            usersReducer, 
            match: { params: { key } } 
        } = this.props

        if(usersReducer.error) 
            return <FatalError message={usersReducer.error} />

        if(!usersReducer.users.length || usersReducer.loading) 
            return <Spinner />
        
        const name = usersReducer.users[key].name
        
        return ( 
            <h1>Publicaciones de {name}</h1>
        )
    }

    renderPosts = () => {
        const {
            usersReducer,
            usersReducer: { users },
            postsReducer,
            postsReducer: { posts },
            match: { params: { key } } 
        } = this.props

        if(!users.length) return

        if(usersReducer.error) return

        if(postsReducer.loading) 
            return <Spinner/>
            
        if(postsReducer.error) 
            return <FatalError message={postsReducer.error} />

        if(!posts.length) return

        if(!('posts_key' in users[key])) return

        const { posts_key } = users[key]

        return this.showInfo(posts[posts_key], posts_key)

    }

    showInfo = (posts, post_key) => (
        posts.map((post, com_key) => (
            <div 
                className="post_title" 
                key={ post.id }
                onClick={ () => this.showComments(post_key, com_key, post.comments) }
            >
                <h2>{ post.title }</h2>
                <p>{ post.body }</p>
                {
                    post.open ? <Comments comments={post.comments} />: ''
                }
            </div>
        ))
    )

    showComments = (post_key, com_key, comments) =>{
        this.props.open_close(post_key, com_key)
        if(!comments.length){
            this.props.getComments(post_key, com_key)
        }
    }

    render(){
        return(
            <div>
                {this.renderUser()}
                {this.renderPosts()}
            </div>
        )
    }
}

const mapStateToProps = ( { usersReducer, postsReducer } ) => {
    return { usersReducer, postsReducer }
}

const mapDispatchToProps = {
    ...usersActions,
    ...postsActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Publications)