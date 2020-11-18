import React from "react";
import axios from "axios";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: "",
      aNum: "",
      fName: "",
      lName: "",
      eMail: "",
      fax: "",
      birthday: "",
      nationality: "",
      phoneNumber: "",
      gender: "",
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.sendData().then((response) => {
      console.log(response);
    });
  }

  handleFileChange(e) {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  sendData() {
    const d = {
      zip: this.state.zip,
      aNum: this.state.aNum,
      fName: this.state.fName,
      lName: this.state.lName,
      eMail: this.state.eMail,
      fax: this.state.fax,
      birthday: this.state.birthday,
      nationality: this.state.nationality,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
    };
    console.log(d);
    return axios({
      method: "post",
      url: "/users/addInform",
      data: d,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        <br />
        zip:{" "}
        <input
          type="text"
          name="zip"
          value={this.state.zip}
          onChange={this.handleValueChange}
        />
        <br />
        aNum:{" "}
        <input
          type="text"
          name="aNum"
          value={this.state.aNum}
          onChange={this.handleValueChange}
        />
        <br />
        fName:{" "}
        <input
          type="text"
          name="fName"
          value={this.state.fName}
          onChange={this.handleValueChange}
        />
        <br />
        lName:{" "}
        <input
          type="text"
          name="lName"
          value={this.state.lName}
          onChange={this.handleValueChange}
        />
        <br />
        eMail:{" "}
        <input
          type="text"
          name="eMail"
          value={this.state.eMail}
          onChange={this.handleValueChange}
        />
        <br />
        fax:{" "}
        <input
          type="text"
          name="fax"
          value={this.state.fax}
          onChange={this.handleValueChange}
        />
        <br />
        birthday:{" "}
        <input
          type="text"
          name="birthday"
          value={this.state.birthday}
          onChange={this.handleValueChange}
        />
        <br />
        nationality:{" "}
        <input
          type="text"
          name="nationality"
          value={this.state.nationality}
          onChange={this.handleValueChange}
        />
        <br />
        phoneNumber:{" "}
        <input
          type="text"
          name="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.handleValueChange}
        />
        <br />
        성별:{" "}
        <input
          type="text"
          name="gender"
          value={this.state.gender}
          onChange={this.handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default Test;
