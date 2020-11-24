import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import StaffInfoDialog from "./StaffInfoDialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },

  hidden: {
    display: "none",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
}));

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
    const url = "/test/test";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("table_name", this.state.table_name)
    const data={
      code: this.state.code,
      rank: this.state.rank,
      salary: this.state.salary
    }
    formData.append("data", data);
    const primary_key ={
      primary_key: "Staff_ID",
      primary_value: this.props.data.Staff_ID,
    }
    formData.append("primary_key", primary_key);
    // FormData의 value 확인
    await axios.post(url, formData, config);
  }

  render() {
    const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>직원 수정</strong>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="부서 코드"
            type="text"
            name="code"
            defaultValue ={this.props.data.Code}
            onChange={this.handleValueChange}
          />
          <br/>
          <TextField
            label="직급"
            type="text"
            name="rank"
            defaultValue ={this.props.data.Rank}
            onChange={this.handleValueChange}
          />
          <br/>
          <TextField
            label="연봉"
            type="text"
            name="salary"
            defaultValue ={this.props.data.Salary}
            onChange={this.handleValueChange}
          />

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={this.handleFormSubmit}>
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

export default withStyles(styles)(StaffModifyDialog);
