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
      info: {},
      info_open: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInfoOpen = this.handleInfoOpen.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
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


  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.props.closeDialog();
  }


  render() {
    const classes = makeStyles();
    return (
      <Dialog maxWidth="lg" open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>예약 상세정보</strong>
        </DialogTitle>
        <DialogContent>
          <List className={classes.root}>
            <ListItem>
              <ListItemText
                primary="예약 번호"
                secondary={this.props.data.Reservation_ID}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="손님 이름(ID)"
                secondary={this.props.data.Last_Name + this.props.data.First_Name + "(" + this.props.data.Customer_ID + ")"}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="방 번호(결제 금액)"
                secondary={this.props.data.Room_Num + "  (" + this.props.data.Price_Won + ")"}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="체크인 ~ 체크아웃 날짜"
                secondary={this.props.data.Check_In + " ~ " + this.props.data.Check_Out}
              />
            </ListItem>
            <Divider  />
            <ListItem>
              <ListItemText
                primary="어른"
                secondary={this.props.data.Adult}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="아이"
                secondary={this.props.data.Child}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="결제예정 날짜"
                secondary={this.props.data.Pay_Date}
              />
          </ListItem>
          <Divider  />
          <ListItem>
              <ListItemText
                primary="카드 시리얼"
                secondary={this.props.data.Card_Serial}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="카드 종류"
                secondary={this.props.data.Bank + " " + this.props.data.Card_Type}
              />
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText
                primary="CVC"
                secondary={this.props.data.CVC}
              />  
          </ListItem>
          </List>
          <Divider />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ReservationMoreInfoDialog);
