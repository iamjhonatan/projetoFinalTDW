import React from 'react';
import axios from 'axios';
import PostList from "../PostList";
import PostForm from "../PostForm";
import {HashRouter as Router, Switch, Route, Link, Redirect, useHistory} from "react-router-dom";
import LoginForm from "../LoginForm";
import {auth} from '../../firebase';
import Routes from "../../routes";


class App extends React.Component {
    setupAxios() {
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
        axios.defaults.headers.post["Content-Type"] = 'application/json';
    }

    constructor(props) {
        super(props);
        this.setupAxios();
        auth.onAuthStateChanged((user) => {
            if (user == null || user.emailVerified === false) {
                localStorage.removeItem("projetoFinalUid");
                localStorage.removeItem("projetoFinalUDisplayName");
                localStorage.removeItem("projetoFinalUEmail");
                return;
            }

            localStorage.projetoFinalUid = user.uid;
            localStorage.projetoFinalUDisplayName = user.displayName;
            localStorage.projetoFinalUEmail = user.email;
        });
    }

    render(){
        return(
            <Routes/>
        )
    }
}


export default App;