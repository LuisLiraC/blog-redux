import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as tasksActions from '../actions/tasksActions'
import Spinner from './Spinner'
import FatalError from './FatalError'

class Tasks extends Component {

    componentDidMount() {
        if(!Object.keys(this.props.tasks).length){
            this.props.getAllTasks()
        }
    }

    componentDidUpdate(){
        if(!Object.keys(this.props.tasks).length){
            this.props.getAllTasks()
        }
    }

    ShowContent = () => {
        const { tasks, loading, error } = this.props

        if (error) return <FatalError message={error} />
        if (loading) return <Spinner />

        return Object.keys(tasks).map( (user_id) => (
            <div key={user_id}>
                <h2>Usuario {user_id}</h2>
                <div className="tasks_content">
                    {this.renderTasks(user_id)}
                </div>
            </div>
        ))
    }

    renderTasks = (user_id) => {
        const { tasks, changeCheck, deleteTask } = this.props
        const tasks_by_user = {
            ...tasks[user_id]
        }

        return Object.keys(tasks_by_user).map(taskId => (
            <div className="task" key={taskId}>
                <input 
                    type="checkbox" 
                    defaultChecked={tasks_by_user[taskId].completed} 
                    onChange={() => changeCheck(user_id, taskId)}
                />

                { tasks_by_user[taskId].title }

                <button><Link to={`/tasks/save/${user_id}/${taskId}`}>Editar</Link></button>
                <button onClick={ () => deleteTask(taskId) }>Eliminar</button>
                
            </div>
        ))
    }

    render() {
        return (
            <div>
                <button><Link to="/tasks/save">Agregar</Link></button>
                {this.ShowContent()}
            </div>
        )
    }
}

const mapStateToProps = reducers => reducers.tasksReducer

export default connect(mapStateToProps, tasksActions)(Tasks)