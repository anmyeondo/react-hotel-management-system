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

class ReservationModifyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ReservationModifyisOpen: false,
      table_name: "Reservation",
      HOTEL_Name: "",
      Room_Num: "",
      Check_In: "",
      Check_Out: "",
      Adult: "",
      Child: "",
      Pay_Date: "",
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
      // info_open: false,
      ReservationModifyisOpen: false,
      table_name: "Reservation",
      HOTEL_Name: "",
      Room_Num: "",
      Check_In: "",
      Check_Out: "",
      Adult: "",
      Child: "",
      Pay_Date: "",
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
    const url = "/reservations/modifyReservation";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    formData.append("table_name", this.state.table_name);
    formData.append("Room_Num", this.state.Room_Num);
    formData.append("Check_In", this.state.Check_In);
    formData.append("Check_Out", this.state.Check_Out);
    formData.append("Adult", this.state.Adult);
    formData.append("Child", this.state.Child);
    formData.append("Pay_Date", this.state.Pay_Date);
    await axios.post(url, formData, config);
  }

  handleer;

  render() {
    // const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>예약 정보 수정</strong>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="호텔 이름"
            type="text"
            name="HOTEL_Name"
            defaultValue={
              this.props.data.HOTEL_Name
            }
            InputProps={{
              readOnly: true,
            }}
          />
          <br/>
          <br/>
          <TextField
            label="방 번호"
            type="text"
            name="Room_Num"
            defaultValue={this.props.data.Room_Num}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          <TextField
            label="체크 인"
            type="date"
            name="Check_In"
            defaultValue={this.props.data.Check_In}
            onChange={this.handleValueChange}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            label="체크 아웃"
            type="date"
            name="Check_Out"
            defaultValue={this.props.data.Check_Out}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          <TextField
            label="어른"
            type="text"
            name="Adult"
            defaultValue={this.props.data.Adult}
            onChange={this.handleValueChange}
          />
          &nbsp;&nbsp;&nbsp;
          <TextField
            label="아이"
            type="text"
            name="Child"
            defaultValue={this.props.data.Child}
            onChange={this.handleValueChange}
          />

          <br />
          <br />
          <TextField
            label="결제 예정일"
            type="date"
            name="Pay_Date"
            defaultValue={this.props.data.Pay_Date}
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

export default withStyles(styles)(ReservationModifyDialog);
