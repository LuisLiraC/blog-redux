import React, {Component, Fragment} from 'react'
import Menu from './Menu'

class Layout extends Component {
    render(){
        const {children} = this.props;
        return(
            <Fragment>
                <Menu />
                <div className="margin">
                    {children}
                </div>
            </Fragment>
        )
    }
}

export default Layout;