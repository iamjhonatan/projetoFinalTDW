import React from 'react';
import {HashRouter as Router, Link} from "react-router-dom";
import LoginForm from "../LoginForm";
import Gallery from "../Gallery";
import PostForm from "../PostForm";

function Menu(props){
    return (
        <p>
            <p><Link to="/posts">Post list</Link></p>
            <p><Link to="/posts/new">Write a new post</Link></p>
            <p><Link to="/gallery">Photo gallery</Link></p>
        </p>
    );
}

export default Menu;