import React, { Component } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

class SelectRank extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        value: "RED",
        label: "RED",
      },
      {
        value: "Diamond",
        label: "Diamond",
      },
      {
        value: "Gold",
        label: "Gold",
      },
      {
        value: "Silver",
        label: "Silver",
      },
      {
        value: "BRONZE",
        label: "BRONZE",
      },  
      {
        value: "REGULAR",
        label: "REGULAR",
      },
    ];

    this.state = {
      options: this.options,
      value: null,
    };
  }

  changeHandler = (value) => {
    const curValue = value;
    this.setState({ value });
    this.props.changeHandler(curValue.value);
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

export default SelectRank;
