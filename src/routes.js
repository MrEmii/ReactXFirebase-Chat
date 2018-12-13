import React from 'react';
import {Route, Switch} from 'react-router-dom';

import App from './components/App';
import ChatRoom from './components/pages/chatroom/ChatRoom';
import Signup from './components/pages/signup/Signup';

const AppRoutes = () => 
    <App>
        <Switch>
            <Route exact path="/" component={ChatRoom}/>
            <Route exact path="/signup" component={Signup}/>
        </Switch>
    </App>;

export default AppRoutes;