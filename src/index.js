import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './page/App';
//import PostForm from './page/PostForm';
import * as serviceWorker from './serviceWorker';
import LoginForm from "./page/LoginForm";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
