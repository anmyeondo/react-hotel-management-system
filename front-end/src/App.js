import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Header from "./components/pages/Header";
import Customer from "./components/pages/Customer";
import Staff from "./components/pages/Staff";
// import Test from "./components/pages/Test";
import Reservation from "./components/pages/Reservation";
import Restaurant from "./components/pages/Restaurant";
import Parkinglot from "./components/pages/Parkinglot";
import Room from "./components/pages/Room";
import AdminMain from "./components/pages/AdminMain";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: false,
      user: {
        Staff_ID: null,
        Staff_Password: null,
      },
    };
    this.checkPermission = this.checkPermission.bind(this);
    this.checkLogined = this.checkLogined.bind(this);
  }

  async checkLogined() {
    await axios({
      method: "get",
      url: "/staffs/sessionLogin",
    }).then((res) => {
      if (res.data.permission) {
        document.location.href = "/header";
      }
    });
  }

  async checkPermission() {
    await axios({
      method: "get",
      url: "/staffs/sessionLogin",
    }).then((res) => {
      if (res.data.permission) {
        this.setState({
          permission: true,
          user: res.data.user,
        });
      } else {
        this.setState({
          permission: false,
          user: {
            Staff_ID: null,
            Staff_Password: null,
          },
        });
      }
      if (!this.state.permission) {
        document.location.href = "/";
      }
    });
  }

  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={() => <Login checkLogined={this.checkLogined} />}
        />
        <Route
          path="/header"
          render={() => <AdminMain checkPermission={this.checkPermission} />}
        />
        <Route
          path="/staff"
          render={() => <Staff checkPermission={this.checkPermission} />}
        />
        <Route
          path="/customer"
          render={() => <Customer checkPermission={this.checkPermission} />}
        />
        <Route
          path="/reservation"
          render={() => <Reservation checkPermission={this.checkPermission} />}
        />
        <Route
          path="/room"
          render={() => <Room checkPermission={this.checkPermission} />}
        />
        <Route path="/restaurant" render={() => (<Restaurant checkPermission={this.checkPermission}/>)}/>
        <Route path="/parking_lot" render={() => (<Parkinglot checkPermission={this.checkPermission}/>)}/>
      </Router>
    );
  }
}
export default App;
