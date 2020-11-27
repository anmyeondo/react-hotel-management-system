import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import SelectRank from "./../../modules/SelectRank";
import InputLabel from "@material-ui/core/InputLabel";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },
}));

class CustomerModifyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomerModifyisOpen: false,
      table_name: "Customer",
      E_Mail: "",
      Fax: "",
      Phone_Number: "",
      Rank: "",
      Mileage: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.modifyBtnSubmit = this.modifyBtnSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.postData = this.postData.bind(this);
    this.handleRankChange = this.handleRankChange.bind(this);
  }

  // Dialog 종료시 실행
  handleClose() {
    this.setState({
      CustomerModifyisOpen: false,
      table_name: "Customer",
      E_Mail: "",
      Fax: "",
      Phone_Number: "",
      Rank: "",
      Mileage: "",
    });
    this.props.closeDialog();
  }

  // 수정버튼 클릭시 실행
  async modifyBtnSubmit(e) {
    console.log(this.state);
    e.preventDefault();
    await this.postData()
      .then(() => {
        this.handleClose();
      })
      .then(() => {
        this.props.refreshTable();
      });
  }

  // 수정시 state 변경
  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    // console.log(e.target.value);
    this.setState(nextState);
  }

  // MVP 등급 선택시 실행
  handleRankChange = (value) => {
    this.setState({ Rank: value });
  };

  // DB 변경 쿼리 API 실행
  async postData() {
    // 기본설정
    const formData = new FormData();
    const url = "/customers/modifyCustomer";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const data = {
      E_Mail: this.state.E_Mail,
      Fax: this.state.Fax,
      Phone_Number: this.state.Phone_Number,
      Rank: this.state.Rank,
      Mileage: this.state.Mileage,
    };
    const primary_key = {
      primary_key: "Customer_ID",
      primary_value: this.props.data.Customer_ID,
    };

    formData.append("table_name", this.state.table_name);
    formData.append("primary_key", JSON.stringify(primary_key));
    formData.append("data", JSON.stringify(data));

    await axios.post(url, formData, config);
  }

  handleer;

  render() {
    // const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>고객 정보 수정</strong>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="고객 이름"
            type="text"
            name="Customer_Name"
            defaultValue={
              this.props.data.Last_Name + this.props.data.First_Name
            }
            InputProps={{
              readOnly: true,
            }}
          />
          <br />
          <InputLabel htmlFor="max-width">MVP 등급</InputLabel>
          <SelectRank changeHandler={this.handleRankChange} />
          <br />
          <TextField
            label="이메일"
            type="text"
            name="E_Mail"
            defaultValue={this.props.data.E_Mail}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="팩스번호"
            type="text"
            name="Fax"
            defaultValue={this.props.data.Fax}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="전화번호"
            type="text"
            name="Phone_Number"
            defaultValue={this.props.data.Phone_Number}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="마일리지"
            type="text"
            name="Mileage"
            defaultValue={this.props.data.Mileage}
            onChange={this.handleValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.modifyBtnSubmit}
          >
            수정
          </Button>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(CustomerModifyDialog);
