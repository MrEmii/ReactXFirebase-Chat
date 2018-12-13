import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
})

render(
    <Router>
        <AppRoutes />
    </Router>,
    document.getElementById('root')
)
