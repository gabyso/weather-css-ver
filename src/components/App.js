import React from 'react';
import Header from './Header';
import { Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import history from '../history';
import '../CSS/styles.css';
import '../CSS/mobile.css';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Header />
                <Route path="/" exact component={Home}/>
                <Route path="/favorites" component={Favorites}/>
            </Router>
        </div>
    );
};

export default App;