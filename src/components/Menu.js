import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => (
    <nav id="menu">
        <div className="btn btn-info mr-2">
            <Link to="/" >Usuarios</Link>
        </div>
        <div className="btn btn-info ml-2">
            <Link to="/tasks">Tareas</Link>
        </div>
    </nav>
)

export default Menu