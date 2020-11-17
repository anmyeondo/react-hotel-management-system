import React from 'react';
import Login from './components/pages/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './Header'
import Customer from './Customer'
import Employee from './Employee'
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} />
      <Route path='/header' component={Header} />
      <Route path='/employee' component={Employee} />
      <Route path='/customer' component={Customer}  />
      {/* <Route path='/test' component={test} /> */}
    </Router>
  );
}
export default App;