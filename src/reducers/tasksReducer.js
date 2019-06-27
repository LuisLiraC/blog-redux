import { GET_ALL_TASKS, LOADING, ERROR, CHANGE_TITLE, CHANGE_USER_ID, SAVED, UPDATE, CLEAN } from '../types/tasksTypes'

const INITIAL_STATE = {
    tasks: {},
    loading: false,
    error: "",
    userId: "",
    title: "",
    redirect: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
                error: "",
                redirect: false
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
        case CHANGE_USER_ID:
            return {
                ...state,
                userId: action.payload
            }
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case SAVED:
            return {
                ...state,
                tasks: {},
                loading: false,
                error: "",
                redirect: true,
                userId: "",
                title: ""
            }
        case UPDATE:
            return {
                ...state, 
                tasks: action.payload
            }
        case CLEAN:
            return {
                ...state,
                userId: "",
                title: ""
            }
        default:
            return state
    }
}