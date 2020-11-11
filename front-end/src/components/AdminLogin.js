import React, { Component } from 'react';
import { fetch } from 'axios';

export default class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  play(name) {
    const url = 'api/adminpage/login/' + name;
    console.log(url);
    fetch(url, {
      method: 'get',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>아이디찾기</h1>
        아이디:
        <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange} />
        <br />
        <button
          type="submit"
          onClick={(e) => {
            this.play(this.state.name);
          }}
        >
          찾기
        </button>
      </form>
    );
  }
}
