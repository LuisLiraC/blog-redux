import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as taskActions from '../actions/tasksActions'
import Spinner from './Spinner'
import FatalError from './FatalError'
import { Redirect } from 'react-router-dom'

class NewTask extends Component {

    componentDidMount() {
        const {
            match: { params: { userId, taskId } },
            tasks,
            changeUserId,
            changeTitle,
            cleanForm
        } = this.props

        if (userId && taskId) {
            const task = tasks[userId][taskId]
            changeUserId(task.userId)
            changeTitle(task.title)
        } else {
            cleanForm()
        }
    }

    changeUserId = (event) => {
        this.props.changeUserId(event.target.value)
    }

    changeTitle = (event) => {
        this.props.changeTitle(event.target.value)
    }

    save = () => {
        const { 
            userId, 
            title, 
            addTask,
            match: { params: { userId: us_id, taskId } },
            tasks,
            updateTask
        } = this.props

        const newTask = {
            userId: userId,
            title: title,
            completed: false
        }

        if(us_id && taskId){
            const task = tasks[us_id][taskId]
            const taskUpdated = {
                ...newTask,
                completed: task.completed,
                id: task.id
            }
            updateTask(taskUpdated)
        } else {
            addTask(newTask)
        }

    }

    disable = () => {
        const { userId, title, loading } = this.props

        if (loading) {
            return true
        }

        if (!userId || !title) {
            return true
        }

        return false
    }

    showAction = () => {
        const { error, loading } = this.props
        if (loading) return <Spinner />
        if (error) return <FatalError message={error} />
    }

    render() {
        return (
            <div>
                {this.props.redirect && <Redirect to="/tasks" />}
                <h2>Crear nueva tarea</h2>
                <div>
                    <label >Usuario ID</label>
                    <input
                        type="number"
                        value={this.props.userId}
                        onChange={this.changeUserId}
                    />

                    <br /><br />

                    <label >Título</label>
                    <input
                        type="text"
                        value={this.props.title}
                        onChange={this.changeTitle}
                    />

                    <br /><br />

                    <button
                        onClick={this.save}
                        disabled={this.disable()}
                    >
                        Guardar
                    </button>
                    {this.showAction()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reducers => reducers.tasksReducer

export default connect(mapStateToProps, taskActions)(NewTask)