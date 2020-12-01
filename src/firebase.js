import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {Link} from "react-router-dom";
import React from "react";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBEJ1KeFPPh_h564g4_rossa83LjKWETTo",
    authDomain: "projetofinal-611c0.firebaseapp.com",
    databaseURL: "https://projetofinal-611c0.firebaseio.com",
    projectId: "projetofinal-611c0",
    storageBucket: "projetofinal-611c0.appspot.com",
    messagingSenderId: "362839624174",
    appId: "1:362839624174:web:8e055e7cc0695456ec66ff"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const storage = app.storage();

export {db, auth, storage};