import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
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

class ReservationMoreInfoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      h_id: "",
      i_id: "",
      code: "",
      rank: "",
      bank: "",
      account: "",
      reservation_pw: "",
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

  onDateChange = () => {
    console.log("Changed data");
  };

  handleClose() {
    this.props.closeDialog();
  }

  render() {
    const classes = makeStyles();
    return (
      <Dialog maxWidth="lg" open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>직원 상세정보</strong>
        </DialogTitle>
        <DialogContent>
          <List className={classes.root}>
            <ListItem>
              <ListItemText
                primary="소속 호텔"
                secondary={this.props.data.HOTEL_Name}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText
                primary="이름"
                secondary={
                  this.props.data.Last_Name + this.props.data.First_Name
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
        {/* <ReservationInfoDialog
          info={this.state.info_open}
          handleInfoClose={this.handleInfoClose}
          setInfo={this.setInfo}
        /> */}
      </Dialog>
    );
  }
}

export default withStyles(styles)(ReservationMoreInfoDialog);
