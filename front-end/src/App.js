import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/pages/Login";
import Header from "./components/Header";
import Customer from "./components/pages/Customer";
import Staff from "./components/pages/Staff";
import Test from "./components/pages/Test";
import "./App.css";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/header" component={Header} />
      <Route path="/staff" component={Staff} />
      <Route path="/customer" component={Customer} />
      <Route path="/test" component={Test} />
    </Router>
  );
}
export default App;
