import { GET_ALL_POSTS, LOADING, ERROR } from '../types/postsTypes'

export const getAllPosts = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    
    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/posts/").then(response => response.json())
        dispatch({
            type: GET_ALL_POSTS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "Ha ocurrido un error. Intenta más tarde"
        })
    }
}

export const getUserPosts = (key) => async (dispatch, getState) => {
    
    dispatch({
        type: LOADING
    })

    try {
        const { users } = getState().usersReducer
        const userId = users[key].id
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(response => response.json())
        dispatch({
            type: GET_ALL_POSTS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "Ha ocurrido un error. Intenta más tarde"
        })
    }
}