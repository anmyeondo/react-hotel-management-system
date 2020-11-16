import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from "axios";
import signIn from './auth';
import Button from '@material-ui/core/Button';
import Herosection from './components/HeroSection';
import Header from './Header'
import Customer from './Customer'
import Content from './Content'
import Navigator from './Navigator'
import Paperbase from './Paperbase'
import test from './Test'

function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} />
      <Route path='/header' component={Header} />
      <Route path='/customer' component={Customer} />
      <Route path='/test' component={test} />
    </Router>
  );
}
export default App;