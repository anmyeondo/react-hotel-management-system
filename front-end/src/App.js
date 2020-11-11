import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reservation from './components/pages/Reservation';
import axios from "axios";
import signIn from './auth';
import Button from '@material-ui/core/Button';

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);
  
  return (
    <Login/>
  );
}
export default App;