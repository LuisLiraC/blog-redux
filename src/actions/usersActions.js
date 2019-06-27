import { GET_ALL_USERS, LOADING, ERROR } from '../types/usersTypes'

export const getAllUsers = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users").then(response => response.json())
        dispatch({
            type: GET_ALL_USERS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "Información no disponible"
        })
    }

}