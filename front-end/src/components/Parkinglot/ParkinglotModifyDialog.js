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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },
}));

class ParkinglotModifyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ParkinglotModifyisOpen: false,
      table_name: "Parking_Lot",
      h_name: "",
      zone: "",
      cap: "",
      v_able: this.props.data.Valet_Parking_is_Able,
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
      ParkinglotModifyisOpen: false,
      table_name: "Parking_Lot",
      h_name: "",
      zone: "",
      cap: "",
      v_able: "",
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

  toggleValueChange = () => {
    const nextState = !this.state.v_able;
    console.log(this.state.v_able);
    this.setState({ v_able: nextState });
  };

  postData = async() => {
    axios({
      method: "post",
      url: "/facility/modifyParkinglot",
      data: {
        ZONE: this.props.data.ZONE,
        Hotel_ID: this.props.data.Hotel_ID,
        Capacity: this.state.cap,
        Max_Height_in_Meter: this.state.m_meter,
        Valet_Parking_is_Able: this.state.v_able
      },
    }).then((res) => {
      this.handleClose();
    });
  };
  
  handleer;

  render() {
    // const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>주차장 정보</strong>
        </DialogTitle>
        <DialogContent>
          <div>
          <TextField
            label="호텔 이름"
            type="text"
            name="h_name"
            defaultValue={this.props.data.HOTEL_Name}
            InputProps={{
              readOnly: true,
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            label="주차장 구역 번호"
            type="text"
            name="zone"
            defaultValue={this.props.data.ZONE}
            InputProps={{
              readOnly: true,
            }}
          />
          </div>
          <br />
          <TextField
            label="수용 공간"
            type="text"
            name="cap"
            defaultValue={this.props.data.Capacity}
            onChange={this.handleValueChange}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            label="최대 높이"
            type="text"
            name="m_meter"
            defaultValue={this.props.data.Max_Height_in_Meter}
            onChange={this.handleValueChange}
          />
          <br/>
          <br />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={this.state.v_able}
                onChange={this.toggleValueChange}
              />
            }
            label={"발렛파킹 가능 여부"}
            labelPlacement="start"
          />
          <br />
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

export default withStyles(styles)(ParkinglotModifyDialog);
