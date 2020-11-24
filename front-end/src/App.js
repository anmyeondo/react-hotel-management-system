import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/pages/Login";
import Header from "./components/Header";
import Customer from "./components/pages/Customer";
import Staff from "./components/pages/Staff";
import Test from "./components/pages/Test";
import axios from "axios"
import "./App.css";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      permission: false,
      user: {
        Staff_ID: null,
        Staff_Password: null,
      }
    }
    this.checkPermission = this.checkPermission.bind(this);
    this.checkLogined = this.checkLogined.bind(this);
  }

  async checkLogined() {
    await axios({
      method: "get",
      url: "/staffs/sessionLogin"
    }).then((res) => {
      if(res.data.permission){
        document.location.href = "/header"
      }
    })
  }

  async checkPermission() {
    await axios({
      method: "get",
      url: "/staffs/sessionLogin"
    }).then((res) => {
      if(res.data.permission){
        this.setState({
          permission: true,
          user: res.data.user,
        })
  
      } else {
        this.setState({
          permission: false,
          user: {
            Staff_ID: null,
            Staff_Password: null,
          }
        })
      }
      if(!this.state.permission) {
        document.location.href = "/"
      }
    })
  }

  render() {
    return(
      <Router>
        <Route exact path="/" render={() => (<Login checkLogined={this.checkLogined}/>)}/>
        <Route path="/header" render={() => (<Header checkPermission={this.checkPermission}/>)} />
        <Route path="/staff" render={() => (<Staff checkPermission={this.checkPermission}/>)} />
        <Route path="/customer" render={() => (<Customer checkPermission={this.checkPermission}/>)} />
        <Route path="/test" render={() => (<Test checkPermission={this.checkPermission}/>)}/>
     </Router>
  )};
}
export default App;
