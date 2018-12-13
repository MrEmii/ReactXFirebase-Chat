import React, {Component, Fragment} from 'react';
import Header from './global/Header';
import firebase from 'firebase';

export default class App extends Component {
  
    constructor(){
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
        });
    }
    
    render(){
        const {children} = this.props;
        return(
            <div>
                <Header firebase={firebase}/>
                <div>
                    {children}
                </div>
            </div>
        )
    }   
    
};
