import { GET_ALL_POSTS, LOADING, ERROR, UPDATE_POSTS, COM_LOADING, COM_ERROR, UPDATE_COM } from '../types/postsTypes'

const INITIAL_STATE = {
    posts: [],
    loading: false,
    error: "",
    com_loading: false,
    com_error: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case GET_ALL_POSTS:
            return {
                ...state, 
                posts: action.payload, 
                loading: false,
                error: ""
            }
        case UPDATE_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: ""
            }
        case UPDATE_COM:
            return {
                ...state,
                posts: action.payload,
                com_loading: false,
                com_error: ""
            }
        case LOADING:
            return {
                ...state, 
                loading: true
            }
        case ERROR: 
            return {
                ...state, 
                error: action.payload, 
                loading: false
            }
        case COM_LOADING:
            return {
                ...state, 
                com_loading: true
            }
        case COM_ERROR: 
            return {
                ...state, 
                com_error: action.payload, 
                com_loading: false
            }
        default:
            return state
    }
}