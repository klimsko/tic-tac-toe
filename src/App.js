import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import './css/App.css';

import Login from './components/login';
import Rooms from './components/rooms';
import Game from './components/game';

const App = () => {
  return (
    <Router>
      <div className="container">
        <ul>
          <li><NavLink exact to="/" activeStyle={{fontWeight: 'bold'}} >Login</NavLink></li>
          <li><NavLink to="/rooms" activeStyle={{fontWeight: 'bold'}} >Rooms</NavLink></li>
        </ul>
        <Switch>
          <Route path="/rooms" component={Rooms} />
          <Route path="/game/:gameId" component={Game} />
          <Route path="/" component={Login} />
          <Route render = {() => <p>Błąd 404</p>} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
