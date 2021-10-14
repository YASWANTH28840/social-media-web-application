import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

const privateRoute = ({ component: Component, auth,  ...rest }) => {
    <Route 
    {...rest}
    render={props => 
            auth.isAuthenticated === true ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/login"/>
        )
    }
    />
}


export {privateRoute}