import React from "react";
import axios from "axios";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      h_id: 0,
      i_id: 0,
      code: 0,
      rank: "",
      bank: "",
      account: "",
      staff_pw: "",
      r_date: "",
      salary: "",
      is_able: 0,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.addCustomer().then((response) => {
      console.log(response.data);
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

  addCustomer() {
    return axios({
      method: "post",
      url: "/staffs/addStaff",
      data: {
        h_id: this.state.h_id,
        i_id: this.state.i_id,
        code: this.state.code,
        rank: this.state.rank,
        bank: this.state.bank,
        account: this.state.account,
        staff_pw: this.state.staff_pw,
        r_date: this.state.r_date,
        salary: this.state.salary,
        is_able: this.state.is_able,
      },
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        <br />
        호텔아이디:{" "}
        <input
          type="text"
          name="h_id"
          value={this.state.h_id}
          onChange={this.handleValueChange}
        />
        <br />
        정보아이디:{" "}
        <input
          type="text"
          name="i_id"
          value={this.state.i_id}
          onChange={this.handleValueChange}
        />
        <br />
        코드:{" "}
        <input
          type="text"
          name="code"
          value={this.state.code}
          onChange={this.handleValueChange}
        />
        <br />
        등급:{" "}
        <input
          type="text"
          name="rank"
          value={this.state.rank}
          onChange={this.handleValueChange}
        />
        <br />
        은행:{" "}
        <input
          type="text"
          name="bank"
          value={this.state.bank}
          onChange={this.handleValueChange}
        />
        <br />
        계좌:{" "}
        <input
          type="text"
          name="account"
          value={this.state.account}
          onChange={this.handleValueChange}
        />
        <br />
        비번:{" "}
        <input
          type="text"
          name="staff_pw"
          value={this.state.staff_pw}
          onChange={this.handleValueChange}
        />
        <br />
        등록일:{" "}
        <input
          type="text"
          name="r_date"
          value={this.state.r_date}
          onChange={this.handleValueChange}
        />
        <br />
        연봉:{" "}
        <input
          type="text"
          name="salary"
          value={this.state.salary}
          onChange={this.handleValueChange}
        />
        <br />
        가능여부:{" "}
        <input
          type="text"
          name="is_able"
          value={this.state.is_able}
          onChange={this.handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default Test;
