import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

class HotelSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: null,
    };

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
      this.setState({
        options: res.data,
        value: null,
      });
    });
  };

  changeHandler = async (value) => {
    await this.setState({ value });
    this.props.getHotel(this.state.value);
  };

  render() {
    return (
      <Select
        placeholder='Select Hotel...'
        options={this.state.options}
        value={this.state.value}
        onChange={this.changeHandler}
      />
    );
  }
}

export default HotelSelect;
