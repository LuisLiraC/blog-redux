import { GET_ALL_TASKS, LOADING, ERROR, CHANGE_TITLE, CHANGE_USER_ID, SAVED, UPDATE, CLEAN } from '../types/tasksTypes'

export const getAllTasks = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/todos").then(response => response.json())

        const toDos = {}

        data.map(task => (
            toDos[task.userId] = {
                ...toDos[task.userId],
                [task.id]: {
                    ...task
                }
            }
        ))

        dispatch({
            type: GET_ALL_TASKS,
            payload: toDos
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "Información no disponible"
        })
    }

}

export const changeUserId = (user_id) => (dispatch) => {
    dispatch({
        type: CHANGE_USER_ID,
        payload: user_id
    })

}

export const changeTitle = (title) => (dispatch) => {
    dispatch({
        type: CHANGE_TITLE,
        payload: title
    })
}

export const addTask = (newTask) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/todos",
                { 
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTask)
                }
            ).then(response => response.json())

        console.log(data)
        dispatch({
            type: SAVED
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: "Error al guardar. Intente más tarde"
        })
    }

}

export const updateTask = (updatedTask) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTask.id}`,
                { 
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedTask)
                }
            ).then(response => response.json())

        console.log(data)
        dispatch({
            type: SAVED
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: "Error al guardar. Intente más tarde"
        })
    }
}

export const changeCheck = (user_id, taskId) => (dispatch, getState) => {
    const {tasks} = getState().tasksReducer
    const select = tasks[user_id][taskId]

    const updatedTasks = {
        ...tasks
    }

    updateTask[user_id] = {
        ...tasks[user_id]
    }

    updatedTasks[user_id][taskId] = {
        ...tasks[user_id][taskId],
        completed: !select.completed
    }

    dispatch({
        type: UPDATE,
        payload: updatedTasks
    })
}

export const deleteTask = (taskId) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`,
                { method: 'DELETE' } )
                
        dispatch({
            type: GET_ALL_TASKS,
            payload: {}
        })

    } catch(error){
        dispatch({
            type: ERROR,
            payload: "Servicio no disponible"
        })
    }
}

export const cleanForm = () => (dispatch) => {
    dispatch({
        type: CLEAN
    })
}