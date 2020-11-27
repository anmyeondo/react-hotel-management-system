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
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },
}));

class RestaurantModifyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Restaurant_Name: "",
      HOTEL_Name: "",
      Open_Time: "",
      Close_Time: "",
      Available: "",
      course: [],
    };
  }

  // Dialog 종료시 실행
  handleClose = () => {
    this.setState({
      Restaurant_Name: "",
      HOTEL_Name: "",
      Open_Time: "",
      Close_Time: "",
      Available: "",
      course: [],
    });
    this.props.closeDialog();
  };

  // 수정버튼 클릭시 실행
  modifyBtnSubmit = async (e) => {
    // console.log(this.state);
    e.preventDefault();
    await this.postData()
      .then(() => {
        this.handleClose();
      })
      .then(() => {
        this.props.refreshTable();
      });
  };

  // 수정시 state 변경
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  // // DB 변경 쿼리 API 실행
  // async postData() {
  //   // 기본설정
  //   const formData = new FormData();
  //   const url = "/reservations/modifyReservation";
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };

  //   formData.append("table_name", this.state.table_name);
  //   formData.append("pk", "Reservation_ID");
  //   formData.append("pk_value", this.props.data.Reservation_ID);
  //   const data = {
  //     Room_Num: this.state.Room_Num,
  //     Check_In: this.state.Check_In,
  //     Check_Out: this.state.Check_Out,
  //     Adult: this.state.Adult,
  //     Child: this.state.Child,
  //     Pay_Date: this.state.Pay_Date,
  //   };
  //   formData.append("data", JSON.stringify(data));
  //   // formData.append("Room_Num", this.state.Room_Num);
  //   // formData.append("Check_In", this.state.Check_In);
  //   // formData.append("Check_Out", this.state.Check_Out);
  //   // formData.append("Adult", this.state.Adult);
  //   // formData.append("Child", this.state.Child);
  //   // formData.append("Pay_Date", this.state.Pay_Date);
  //   await axios.post(url, formData, config);
  // }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>레스토랑 수정</strong>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="소유 호텔"
            type="text"
            name="HOTEL_Name"
            defaultValue={this.props.data.HOTEL_Name}
            InputProps={{
              readOnly: true,
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            label="레스토랑명"
            type="text"
            name="Restaurant_Name"
            defaultValue={this.props.data.Restaurant_Name}
            onChange={this.handleValueChange}
            InputProps={{
              readOnly: true,
            }}
          />
          <br />
          <br />
          <Divider />
          <br />
          <Grid container spacing={0} direction="row">
            <Grid item>
              <TextField
                label="영업 시작 시간"
                type="time"
                name="Open_Time"
                defaultValue={this.props.data.Open_Time}
                onChange={this.handleValueChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Grid>
            <Grid item>
              <TextField
                label="영업 종료 시간"
                type="time"
                name="Close_Time"
                defaultValue={this.props.data.Close_Time}
                onChange={this.handleValueChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.modifyBtnSubmit}
            alignItem="flex-start"
          >
            코스 수정
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.modifyBtnSubmit}
          >
            완료
          </Button>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(RestaurantModifyDialog);
