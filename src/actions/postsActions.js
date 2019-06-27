import { LOADING, ERROR, UPDATE_POSTS, COM_LOADING, COM_ERROR, UPDATE_COM } from '../types/postsTypes'
import * as usersTypes from '../types/usersTypes'

const { GET_ALL_USERS } = usersTypes

export const getUserPosts = (key) => async (dispatch, getState) => {
    
    dispatch({
        type: LOADING
    })
    
    let { users } = getState().usersReducer
    const { posts } = getState().postsReducer
    const id = users[key].id

    try {

        const data = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then(response => response.json())

        const news = data.map(post => ({
            ...post,
            comments: [],
            open: false
        }))

        const updatedPosts = [
            ...posts,
            news
        ]

        dispatch({
            type: UPDATE_POSTS,
            payload: updatedPosts
        })

        const posts_key = updatedPosts.length - 1;
        const updatedUsers = [...users]
        updatedUsers[key] = {
            ...users[key],
            posts_key
        }
        
        dispatch({
            type: GET_ALL_USERS,
            payload: updatedUsers
        })

    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "Publicaciones no disponibles"
        })
    }
}

export const open_close = (post_key, com_key) => (dispatch, getState) => {
    const { posts } = getState().postsReducer
    const selected = posts[post_key][com_key]

    const postUpdate = {
        ...selected,
        open: !selected.open
    }

    const updatedPosts = [...posts]
    updatedPosts[post_key] = [
        ...posts[post_key]
    ]

    updatedPosts[post_key][com_key] = postUpdate

    dispatch({
        type: UPDATE_POSTS,
        payload: updatedPosts
    })
}

export const getComments = (post_key, com_key) => async (dispatch, getState) => {
    
    dispatch({
        type: COM_LOADING
    })

    try {
        const { posts } = getState().postsReducer
        const selected = posts[post_key][com_key]
        const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`).then(response => response.json())

        const postUpdate = {
            ...selected,
            comments: comments
        }

        const updatedPosts = [...posts]
        updatedPosts[post_key] = [
            ...posts[post_key]
        ]

        updatedPosts[post_key][com_key] = postUpdate

        dispatch({
            type: UPDATE_COM,
            payload: updatedPosts
        })
    } catch (error) {
        dispatch({
            type: COM_ERROR,
            payload: "Error al cargar los comentarios"
        })
    }

}