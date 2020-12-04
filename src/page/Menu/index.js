import React from 'react';
import {HashRouter as Router, Link} from "react-router-dom";
import LoginForm from "../LoginForm";
import Gallery from "../Gallery";
import PostForm from "../PostForm";
import "./Menu.css";

function Menu(props){
    return (
        <p class="container">
            <Link to="/posts">Lista de Posts | </Link>
            <Link to="/posts/new">Escrever um novo Post | </Link>
            <Link to="/gallery">Galeria</Link>
        </p>
    );
}

export default Menu;