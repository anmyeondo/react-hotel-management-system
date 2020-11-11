import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitAction = event => {
    event.preventDefault();
    var user = this.state;
    axios
      .post(
        "/api/user/login",
        { id: user.id, password: user.password },
        { withCredentials: true }
      )
      .then(res => {
        console.log("login success!");
        this.props.handleAuth(true);
        this.props.history.goBack();
      })
      .catch(err => {
        console.log(err);
        const res = err.response;
        switch (res.status) {
          case 401:
            alert(res.data.reason);
            break;
          default:
            console.log(res.status);
            break;
        }
      });
  };

  render() {
    return (
      <div className="login">
        <h2>로그인</h2>
        <form onSubmit={this.submitAction}>
          <ul>
            <li>
              <input
                type="text"
                name="id"
                placeholder="아이디"
                onChange={this.onChange}
              />
            </li>
            <li>
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                onChange={this.onChange}
              />
            </li>
            <li>
              <button type="submit">로그인</button>
            </li>
          </ul>
        </form>
        {/* <div>
          <ul>
            <li>
              <Link to="">아이디 찾기</Link>
            </li>
            <li>
              <Link to="">비밀번호 찾기</Link>
            </li>
            <li>
              <Link to="/user/join">회원가입</Link>
            </li>
          </ul>
        </div> */}
      </div>
    );
  }
}

export default Login;