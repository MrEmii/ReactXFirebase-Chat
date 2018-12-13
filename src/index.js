import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyAoY7kpVGuGg2zsanOKuYLMWL64PoiR3jw",
    authDomain: "reactxfirebasemremii.firebaseapp.com",
    databaseURL: "https://reactxfirebasemremii.firebaseio.com",
    projectId: "reactxfirebasemremii",
    storageBucket: "reactxfirebasemremii.appspot.com",
    messagingSenderId: "778537838188"
})

render(
    <Router>
        <AppRoutes />
    </Router>,
    document.getElementById('root')
)