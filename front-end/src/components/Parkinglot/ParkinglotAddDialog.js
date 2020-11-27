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
import ImageUpload from "../ImageUpload";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from "@material-ui/core/Divider";

const styles = makeStyles((theme) => ({
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
    width: 4000,
  },
  dialogcss: {
    align: "center",
  },
}));

class ParkinglotAddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zone: "",
      h_id: "",
      cap: "",
      m_meter: "",
      v_able: 0,
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
    this.handleImageAddClick = this.handleImageAddClick.bind(this);
    this.addParkinglotBtnOnclick = this.addParkinglotBtnOnclick.bind(this);
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
      zone: "",
      h_id: "",
      cap: "",
      m_meter: "",
      v_able: 0,
    });
    this.props.closeDialog();
  }

  handleImageAddClick = (images) => {
    this.setState({ Parkinglot_image: images });
  };

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

  addParkinglotBtnOnclick = () => {
    this.setState({ addParkinglotIsOpen: true });
    console.log(this.state);
  };

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

  async callApi() {
    console.log("AXIOS!");
    const formData = new FormData();
    const url = "/facility/addParkinglot";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    formData.append("ZONE", this.state.zone);
    formData.append("Hotel_ID", this.state.h_id);
    formData.append("Capacity", this.state.cap);
    formData.append("Max_Height_in_Meter", this.state.m_meter);
    formData.append("Valet_Parking_is_Able", this.state.v_able);
    // FormData의 value 확인
    await axios.post(url, formData, config);
  }

  render() {
    const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <span><h3>주차장 추가</h3></span>{" "}
          <Divider/>
        </DialogTitle>
        <DialogContent className={classes.dialogcss}>
          <form className={classes.container} noValidate>
            호텔 선택 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Select
                id="h_id"
                name="h_id"
                value={this.state.h_id}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;
              <MenuItem value={"1"}>Deluna</MenuItem>
              <MenuItem value={"2"}>BaeJJang</MenuItem>
              <MenuItem value={"3"}>Heaven</MenuItem>
              </Select>
          </form>
          <TextField
            label="구역 번호"
            type="text"
            name="zone"
            value={this.state.zone}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="수용 공간"
            type="text"
            name="cap"
            value={this.state.cap}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="최대 높이"
            type="text"
            name="m_meter"
            value={this.state.m_meter}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          발렛 파킹 가능 유무
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Select
                id="v_able"
                name="v_able"
                value={this.state.v_able}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;
              <MenuItem value={0}>불가능</MenuItem>
              <MenuItem value={1}>가능</MenuItem>
          </Select>
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ParkinglotAddDialog);
