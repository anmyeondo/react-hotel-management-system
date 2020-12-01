import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import StaffInfoDialog from "./StaffInfoDialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    minHeight: "1080px",
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

class StaffMoreInfoDialog extends React.Component {
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
    await axios({
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
    const classes = makeStyles();
    return (
      <Dialog maxWidth="lg" open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <strong><h3>직원 상세정보</h3></strong>
                </Grid>
          <br/>
          <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                  <img
                    src={this.props.data.Staff_Image}
                    style={{ width: "112px", height: "112px", align: "center" }}
                  />
                </Grid>
        </DialogTitle>
        <DialogContent>
        <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <strong><h3>About</h3></strong>
                </Grid>
          <List className={classes.root}>
            <Divider/><Divider/>
            <Divider/><Divider/>
            <ListItem>
              <ListItemText
                primary="소속 호텔"
                secondary={this.props.data.HOTEL_Name}
              />

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="담당 부서"
                secondary={this.props.data.Dept_Name}
              />

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText primary="직급" secondary={this.props.data.Rank} />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="이름(ID)"
                secondary={
                  this.props.data.Last_Name + this.props.data.First_Name + "(" + this.props.data.Staff_ID + ")"
                }
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="성별"
                secondary={
                  this.props.data.Gender
                }
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="연봉"
                secondary={
                  this.props.data.Salary
                }
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="국적"
                secondary={
                  this.props.data.Nationality
                }
              />
              </ListItem>
            <Divider/><Divider/>
            <Divider/><Divider/>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <strong><h3>Contact</h3></strong>
                </Grid>
            <Divider/>
            <ListItem>
              <ListItemText
                primary="Phone"
                secondary={this.props.data.Phone_Number}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="이메일"
                secondary={this.props.data.E_Mail}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="Fax"
                secondary={this.props.data.Fax}
              />
            </ListItem>
            <Divider/><Divider/>
            <Divider/><Divider/>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <strong><h3>Address</h3></strong>
                </Grid>
            <Divider/>
            <ListItem>
              <ListItemText
                  primary="우편번호"
                  secondary={this.props.data.Zip}
                />
                <br/>
                <ListItemText
                  primary="우편번호 정보"
                  secondary={this.props.data.State + " " + this.props.data.City + " " + this.props.data.Street_Name + " " + this.props.data.Street_Number} 
                />
              <ListItemText
                  primary="상세주소"
                  secondary={this.props.data.Apt_Num}
                />
            </ListItem>
            <Divider/><Divider/>
            <Divider/><Divider/>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <strong><h3>Anniversary</h3></strong>
                </Grid>
            <Divider/>
            <ListItem>
              <ListItemText
                primary="등록 일자"
                secondary={this.props.data.RegDate.slice(undefined, 10)}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="생일"
                secondary={this.props.data.Birthday.slice(undefined, 10)}
              />
            </ListItem>
            <Divider/><Divider/><Divider/><Divider/>
          </List>
        </DialogContent>
        <DialogActions>
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

export default withStyles(styles)(StaffMoreInfoDialog);
