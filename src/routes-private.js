import React from 'react';
import axios from 'axios';
import {HashRouter as Router, Switch, Route, Link, Redirect, useHistory} from "react-router-dom";



function PrivateRoute ({ component: Component, render = null, children = null, ...rest}) {
    function loggedIn(){
        return localStorage.projetoFinalUid;
    }

    let renderMethod = render || children;

    return (
        <Route {...rest} render={(props) => (
            loggedIn() ?
                (renderMethod ? renderMethod(props) : <Component {...props} />)
                : <Redirect to='/login'/>)}
        />
    )
}

export default PrivateRoute;