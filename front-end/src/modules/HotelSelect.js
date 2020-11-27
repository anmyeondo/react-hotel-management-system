import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { sizing } from "@material-ui/system";

class HotelSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: null,
    };

    this.callData = this.callData.bind(this);
  }

  componentDidMount = async () => {
    this.callData();
  };

  // DB에서 {호텔번호, 호텔이름}을 response 받는 메소드
  callData = async () => {
    await axios({
      method: "get",
      url: "/modules/hotelselect",
    }).then((res) => {
      console.log(res.data);
      this.setState({
        options: res.data,
        value: null,
      });
    });
  };

  changeHandler = async (value) => {
    await this.setState({ value });
    await console.log(this.state);
  };

  render() {
    return (
      <Select
        options={this.state.options}
        value={this.state.value}
        onChange={this.changeHandler}
      />
    );
  }
}

export default HotelSelect;
