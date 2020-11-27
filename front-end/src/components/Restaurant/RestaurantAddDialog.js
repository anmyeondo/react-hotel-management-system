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

class RestaurantAddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
      r_name: "",
      h_id: "",
      o_time: "",
      c_time: "",
      available: 0,
      restaurant_image: null,
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
    this.addRestaurantBtnOnclick = this.addRestaurantBtnOnclick.bind(this);
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
      file: null,
      fileName: "",
      r_name: "",
      h_id: "",
      o_time: "",
      c_time: "",
      available: "",
      restaurant_image: null,
    });
    this.props.closeDialog();
  }

  handleImageAddClick = (images) => {
    this.setState({ restaurant_image: images });
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

  addRestaurantBtnOnclick = () => {
    this.setState({ addRestaurantIsOpen: true });
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
    const formData = new FormData();
    const url = "/facility/addRestaurant";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    formData.append("Restaurant_Name", this.state.r_name);
    formData.append("Hotel_ID", this.state.h_id);
    formData.append("Open_Time", this.state.o_time);
    formData.append("Close_Time", this.state.c_time);
    formData.append("Available", this.state.available);
    formData.append("Restaurant_Img", this.state.restaurant_image);

    // FormData의 value 확인
    await axios.post(url, formData, config);
  }

  render() {
    const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <span>레스토랑 추가</span>{" "}
        </DialogTitle>
        <DialogContent className={classes.dialogcss}>
          <ImageUpload updateImage={this.handleImageAddClick} />
          <form className={classes.container} noValidate>
            {/* 프로필 이미지 :<br /> <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> */}
            <br />
            <br />
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
            label="레스토랑 이름"
            type="text"
            name="r_name"
            value={this.state.r_name}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="영업시작 시간"
            type="text"
            name="o_time"
            value={this.state.o_time}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="영업종료 시간"
            type="text"
            name="c_time"
            value={this.state.c_time}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          영업 상태
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Select
                id="available"
                name="available"
                value={this.state.available}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;
              <MenuItem value={0}>영업 안함</MenuItem>
              <MenuItem value={1}>영업 중</MenuItem>
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

export default withStyles(styles)(RestaurantAddDialog);
