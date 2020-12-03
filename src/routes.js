import React from 'react';
import axios from 'axios';
import PostList from "./page/PostList";
import PostForm from "./page/PostForm";
import {HashRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import LoginForm from "./page/LoginForm";
import Menu from "./page/Menu";
import PrivateRoute from "./routes-private";
import Gallery from "./page/Gallery";

function routes(){
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginForm} />
                    <PrivateRoute exact path="/posts/:id" component={PostForm} />
                    <Route exact path="/posts" component={PostList} />
                    <Route exact path="/menu" component={Menu} />
                    <Route exact path="/gallery" component={Gallery}/>
                </Switch>
            </Router>
        </div>
    );
}


export default routes;