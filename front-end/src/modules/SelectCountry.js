import React, { Component } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
 
class SelectCountry extends Component {
  constructor(props) {
    super(props)
 
    this.options = countryList().getData()
 
    this.state = {
      options: this.options,
      value: null,
    }
  }
 
  changeHandler = value => {
    this.setState({ value })
    this.props.changeCountry(value.label);
  }
 
  render() {
    return (
      <Select
        options={this.state.options}
        value={this.state.value}
        onChange={this.changeHandler}
      />
    )
  }
}

export default SelectCountry;