import React from 'react';
import Login from './components/Login';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reservation from './components/pages/Reservation';
import axios from "axios";


class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/reservation' component={Reservation} />
            <Login />;
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
