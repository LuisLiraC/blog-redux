import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as tasksActions from '../actions/tasksActions'
import * as usersActions from '../actions/usersActions'
import Spinner from './Spinner'
import FatalError from './FatalError'

class Tasks extends Component {

    componentDidMount() {
        if(!Object.keys(this.props.tasks).length){
            this.props.getAllTasks()
        }

        this.props.getAllUsers()
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
                <h2>Tareas de: {tasks[user_id].userName}</h2>
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
                    className="checkbox mr-3"
                    defaultChecked={tasks_by_user[taskId].completed} 
                    onChange={() => changeCheck(user_id, taskId)}
                />

                <p className="task-title mb-0 mr-3">{ tasks_by_user[taskId].title }</p>
                
                <Link to={`/tasks/save/${user_id}/${taskId}`}><span className="edit-solid icon mr-3"></span></Link>
                <span className="trash-solid icon ml-5" onClick={ () => deleteTask(taskId) }></span>
                
            </div>
        ))
    }

    render() {

        return (
            <div>
                <Link to="/tasks/save"><p className="btn btn-dark custom-button">Agregar</p></Link>
                {this.ShowContent()}
            </div>
        )
    }
}

const mapStateToProps = reducers => reducers.tasksReducer

const mapDispatchToProps = {
    ...usersActions,
    ...tasksActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)