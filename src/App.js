import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails'
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import Admin from './components/Admin/Admin.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));


    return (
        <GoogleOAuthProvider clientId="296885130524-2b5nkt5aqb99osr2i8cls1ltvij5bn8e.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={() => <Redirect to="/posts" />} />
                        <Route path="/posts" exact component={Home} />
                        <Route path="/posts/search" exact component={Home} />
                        <Route path="/posts/:id" component={PostDetails} />
                        <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/posts" />)} />
                        <Route path="/admin" exact component={() => <Admin route="/admin/" /> }/>
                        <Route path="/admin/report" exact component={() => <Admin route="/admin/report" /> }/>

                    </Switch>
                </Container>
            
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;