import React, { Component } from "react";
import Select from "react-select";

class SelectFloor extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        value: 100,
        label: "1층",
      },
      {
        value: 200,
        label: "2층",
      },
      {
        value: 300,
        label: "3층",
      },
      {
        value: 400,
        label: "4층",
      },
      {
        value: 500,
        label: "5층",
      },
      {
        value: 600,
        label: "6층",
      },
      {
        value: 700,
        label: "7층",
      },
      {
        value: 800,
        label: "8층",
      },
    ];

    this.state = {
      options: this.options,
      value: 100,
      label: "1층",
    };
  }

  changeHandler = async (value) => {
    await this.setState({ value });
    this.props.getRoomInfo(this.state.value);
  };

  render() {
    return (
      <Select
        placeholder="Select Floor..."
        options={this.state.options}
        value={this.state.value}
        onChange={this.changeHandler}
      />
    );
  }
}

export default SelectFloor;
