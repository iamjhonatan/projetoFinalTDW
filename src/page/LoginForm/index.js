import React from 'react';
import './LoginForm.css';
import {auth} from '../../firebase';
import {HashRouter as Router, Switch, Route, Link, Redirect, withRouter} from "react-router-dom";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            txtEmail: "",
            txtPassword: "",
            message: "."
        }
        this.onUpdate = this.onUpdate.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    renderLoggedIn() {
        //let {user} = this.state;
        this.props.history.push('/Menu');

    }

    onUpdate(e) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj)
    }

    onLogin() {
        let {txtEmail, txtPassword} = this.state;

        auth.signInWithEmailAndPassword(txtEmail, txtPassword)
            .then(response => {
                let {user} = response;
                if (!user.emailVerified) {
                    this.setState({message: "Seu e-mail ainda não foi verificado!"});
                    return;
                }
                this.setState({
                    user: {
                        name: user.displayName,
                        email: user.email
                    }
                }
            )
            }).catch(err => {
            this.setState({message: err.code + " " + err.message});
        });
    }


    onCreate() {
        let {txtEmail, txtPassword} = this.state;

        auth.createUserWithEmailAndPassword(txtEmail, txtPassword)
            .then(user => {
                auth.currentUser.sendEmailVerification().then(() => {
                    this.setState({message: "Usuário cadastrado, verifique seu e-mail!"});
                }).catch(e => {
                    this.setState({message: "Favor digitar um e-mail válido!"});
                })
            }).catch(err => {
                this.setState({message: err.message});
        });
    }

    renderLoggedOut(){
        return (
            <div>
                <div>{this.state.message}</div>
                <div className="loginForm">
                    <p><label>E-mail: </label><input type="email" name="txtEmail" value={this.state.txtEmail} onChange={this.onUpdate} /> </p>
                    <p><label>Password: </label><input type="password" name="txtPassword" value={this.state.txtPassword} onChange={this.onUpdate} /> </p>
                    <p style={{textAlign: "center"}}>
                        <input value="Login" className="btnConfirm" type="button" onClick={this.onLogin} />
                        <input value="Create" className="btnCreate" type="button" onClick={this.onCreate} />
                    </p>
                </div>
            </div>
        )
    }

    render(){
        const {user} = this.state;
        return user ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

export default withRouter (LoginForm);