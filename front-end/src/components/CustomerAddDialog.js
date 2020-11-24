import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CustomerInfoDialog from "./CustomerInfoDialog";
import { ImageSearch } from "@material-ui/icons";
import ImageUpload from "./ImageUpload";

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

class CustomerAddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        i_id: "",
        rank: "",
        valid_month: "",
        login_id: "",
        login_pw: "",
        mileage: "",
        r_date: "2020-11-24",
        m_due: "2020-11-24",
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
      i_id: "",
      rank: "",
      valid_month: "",
      login_id: "",
      login_pw: "",
      mileage: "",
      r_date: "2020-11-24",
      m_due: "2020-11-24",
    });
    this.props.closeDialog();
  }

  handleImageAddClick = (images) => {
    this.setState({ customer_image: images });
  };

  async handleFormSubmit(e) {
    e.preventDefault();
    this.setState({
      i_id: await this.sendData(),
    });

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
    this.setState(nextState);
  }

  async callApi() {
    const formData = new FormData();
    const url = "/customers/addCustomer";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    formData.append("i_id", this.state.i_id);
    formData.append("rank", this.state.rank);
    formData.append("valid_month", this.state.valid_month);
    formData.append("login_id", this.state.login_id);
    formData.append("login_pw", this.state.login_pw);
    formData.append("mileage", this.state.mileage);
    formData.append("r_date", this.state.r_date);
    formData.append("m_due", this.state.m_due);

    // FormData의 value 확인
    await axios.post(url, formData, config);
  }

  render() {
    const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <span>고객 추가</span>{" "}
        </DialogTitle>
        <DialogContent className={classes.dialogcss}>
          <form className={classes.container} noValidate>
            <br />
            <br />
            <TextField
              id="r_date"
              name="r_date"
              label="등록일자"
              type="date"
              value={this.state.r_date}
              className={classes.textField}
              onChange={this.handleValueChange}
            />
          </form>
          <TextField
            label="멤버쉽"
            type="text"
            name="rank"
            value={this.state.rank}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="멤버쉽 기간"
            type="text"
            name="valid_month"
            value={this.state.valid_month}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="마일리지"
            type="text"
            name="mileage"
            value={this.state.mileage}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="계정"
            type="text"
            name="login_id"
            value={this.state.login_id}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="비밀번호"
            type="text"
            name="login_pw"
            value={this.state.login_pw}
            onChange={this.handleValueChange}
          />
          <br />
          <form className={classes.container} noValidate>
            <br />
            <TextField
              id="m_due"
              name="m_due"
              label="멤버쉽 만료일자"
              type="date"
              defaultValue={this.state.m_due}
              value={this.state.m_due}
              className={classes.textField}
              onChange={this.handleValueChange}
            />
          </form>
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleInfoOpen}
          >
            개인정보
          </Button>
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
        <CustomerInfoDialog
          info={this.state.info_open}
          handleInfoClose={this.handleInfoClose}
          setInfo={this.setInfo}
        />
      </Dialog>
    );
  }
}

export default withStyles(styles)(CustomerAddDialog);
