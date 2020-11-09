import React from 'react';
import Login from './Login';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reservation from './components/pages/Reservation';
import Mypage from './components/pages/Mypage';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Login />;
          </Router>
      </div>
    );
  }
}

export default App;
