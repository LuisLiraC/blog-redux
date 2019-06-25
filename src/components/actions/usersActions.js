export const getAll = () => async (dispatch) => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users").then(response => response.json())
    dispatch({
        type: 'get_users',
        payload: data
    })
}