import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import StaffInfoDialog from "./StaffInfoDialog";
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class StaffModifyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      h_id: "",
      i_id: "",
      code: "",
      rank: "",
      bank: "",
      account: "",
      staff_pw: "",
      r_date: "",
      salary: "",
      is_able: 1,
      table_name: "Staff",
      info: {},
      info_open: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.callApi = this.callApi.bind(this);
    this.handleInfoOpen = this.handleInfoOpen.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
    this.setInfo = this.setInfo.bind(this);
  }

  // Info dialog 관련 메서드
  handleInfoOpen() {
    this.setState({
      info_open: true,
    });
  }

  handleInfoClose() {
    this.setState({
      info_open: false,
    });
  }
  setInfo(data) {
    this.setState({
      info: data,
    });
  }

  sendData = async () => {
    const infoId = await axios({
      method: "post",
      url: "/users/addInform",
      data: this.state.info,
    }).then((res) => {
      return res.data.insertId;
    });
    return infoId;
  };

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  onDateChange = () => {
    console.log("Changed data");
  };

  handleClose() {
    this.setState({
      h_id: "",
      i_id: "",
      code: "",
      rank: "",
      bank: "",
      account: "",
      staff_pw: "",
      r_date: "",
      salary: "",
      is_able: 1,
    });
    this.props.closeDialog();
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    await this.callApi()
      .then(() => {
        this.handleClose();
      })
      .then(() => {
        this.props.refreshTable();
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
    console.log(e.target.value);
    this.setState(nextState);
  }

  async callApi() {
    const formData = new FormData();
    const url = "/staffs/modifyStaff";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("table_name", this.state.table_name);

    const data = {
      Code: this.state.code,
      Rank: this.state.rank,
      Salary: this.state.salary,
    };

    formData.append("data", JSON.stringify(data));
    const primary_key = {
      primary_key: "Staff_ID",
      primary_value: this.props.data.Staff_ID,
    };
    formData.append("primary_key", JSON.stringify(primary_key));
    // FormData의 value 확인
    await axios.post(url, formData, config);
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>직원 수정</strong>
        </DialogTitle>
        <DialogContent>
        소속 부서&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Select
                id="code"
                name="code"
                defaultValue={this.props.data.code}
                value={this.state.code}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MenuItem value={"1000"}>관리</MenuItem>
              <MenuItem value={"1001"}>마케팅</MenuItem>
              <MenuItem value={"1002"}>식음료</MenuItem>
              <MenuItem value={"1003"}>개발1팀</MenuItem>
              <MenuItem value={"1004"}>개발2팀</MenuItem>
              <MenuItem value={"1005"}>청소</MenuItem>
              <MenuItem value={"1006"}>자재관리</MenuItem>
              <MenuItem value={"1007"}>IT관리</MenuItem>
              <MenuItem value={"1008"}>서비스</MenuItem>
              </Select>
          <br />
          <br />
          직급&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Select
                id="rank"
                name="rank"
                value={this.state.rank}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MenuItem value={"계약직"}>계약직</MenuItem>
              <MenuItem value={"정규직"}>정규직</MenuItem>
              <MenuItem value={"매니저"}>매니저</MenuItem>
              <MenuItem value={"총괄 감독"}>총괄 감독</MenuItem>
              <MenuItem value={"CEO"}>CEO</MenuItem>
              </Select>
          <br />
          <br />
          <TextField
            label="연봉"
            type="text"
            name="salary"
            defaultValue={this.props.data.Salary}
            onChange={this.handleValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleFormSubmit}
          >
            수정
          </Button>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
        <StaffInfoDialog
          info={this.state.info_open}
          handleInfoClose={this.handleInfoClose}
          setInfo={this.setInfo}
        />
      </Dialog>
    );
  }
}

export default StaffModifyDialog;
