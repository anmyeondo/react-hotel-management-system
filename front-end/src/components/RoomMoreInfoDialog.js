import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
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
});

class RoomMoreInfoDialog extends React.Component {
  handleClose = () => {
    this.props.handleMoreInfoClose();
  };

  render() {
    const { classes } = this.props;
    for (var i = 0; i < this.props.moreInfo.length; i++) {
      if (this.props.moreInfo[i].Room_Num !== this.props.data.Room_Num)
        continue;
      else {
        if (
          this.props.inRange(
            this.props.moreInfo[i].Check_In,
            this.props.moreInfo[i].Check_Out
          )
        ) {
          return (
            <Dialog
              maxWidth="lg"
              open={this.props.open}
              onClose={this.handleClose}
            >
              <DialogTitle>
                {" "}
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <strong>
                    <h3>{this.props.moreInfo[i].Room_Num}호 상세 정보</h3>
                  </strong>
                </Grid>
                <br />
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <div style={{ minWidth: 500 }}>
                    <HomeRoundedIcon
                      style={{
                        width: "128px",
                        height: "128px",
                        align: "center",
                        marginLeft: "38%",
                      }}
                    />
                  </div>
                </Grid>
              </DialogTitle>
              <DialogContent>
                <List className={classes.root}>
                  <ListItem>
                    <ListItemText
                      primary="예약 번호"
                      secondary={this.props.moreInfo[i].Reservation_ID}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="손님 이름(ID)"
                      secondary={
                        this.props.moreInfo[i].Last_Name +
                        this.props.moreInfo[i].First_Name +
                        "(" +
                        this.props.moreInfo[i].Customer_ID +
                        ")"
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="결제 금액"
                      secondary={this.props.moreInfo[i].Price_Won + "₩"}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="체크인 ~ 체크아웃 날짜"
                      secondary={
                        this.props.moreInfo[i].Check_In +
                        " ~ " +
                        this.props.moreInfo[i].Check_Out
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="어른"
                      secondary={this.props.moreInfo[i].Adult}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <ListItemText
                      primary="아이"
                      secondary={this.props.moreInfo[i].Child}
                    />
                  </ListItem>
                  <Divider />
                </List>
                <Divider />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleClose}
                >
                  닫기
                </Button>
              </DialogActions>
            </Dialog>
            // <Dialog
            //   maxWidth="lg"
            //   open={this.props.open}
            //   onClose={this.handleClose}
            // >
            //   <DialogTitle>
            //     {" "}
            //     <strong>방 상세정보</strong>
            //   </DialogTitle>
            //   <DialogContent>
            //     <List className={classes.root}>
            //       <ListItem>
            //         <ListItemText
            //           primary="예약 번호"
            //           secondary={this.props.moreInfo[i].Reservation_ID}
            //         />
            //       </ListItem>
            //       <Divider />
            //       <ListItem>
            //         <ListItemText
            //           primary="손님 이름(ID)"
            //           secondary={
            //             this.props.moreInfo[i].Last_Name +
            //             this.props.moreInfo[i].First_Name +
            //             "(" +
            //             this.props.moreInfo[i].Customer_ID +
            //             ")"
            //           }
            //         />
            //       </ListItem>
            //       <Divider />
            //       <ListItem>
            //         <ListItemText
            //           primary="방 번호(결제 금액)"
            //           secondary={
            //             this.props.moreInfo[i].Room_Num +
            //             "  (" +
            //             this.props.moreInfo[i].Price_Won +
            //             ")"
            //           }
            //         />
            //       </ListItem>
            //       <Divider />
            //       <ListItem>
            //         <ListItemText
            //           primary="체크인 ~ 체크아웃 날짜"
            //           secondary={
            //             this.props.moreInfo[i].Check_In +
            //             " ~ " +
            //             this.props.moreInfo[i].Check_Out
            //           }
            //         />
            //       </ListItem>
            //       <Divider />
            //       <ListItem>
            //         <ListItemText
            //           primary="어른"
            //           secondary={this.props.moreInfo[i].Adult}
            //         />
            //         &nbsp;&nbsp;&nbsp;&nbsp;
            //         <ListItemText
            //           primary="아이"
            //           secondary={this.props.moreInfo[i].Child}
            //         />
            //       </ListItem>
            //       <Divider />
            //       <ListItem>
            //         <ListItemText
            //           primary="결제예정 날짜"
            //           secondary={this.props.moreInfo[i].Pay_Date}
            //         />
            //       </ListItem>
            //       <Divider />
            //     </List>
            //     <Divider />
            //   </DialogContent>
            //   <DialogActions>
            //     <Button
            //       variant="outlined"
            //       color="primary"
            //       onClick={this.handleClose}
            //     >
            //       닫기
            //     </Button>
            //   </DialogActions>
            // </Dialog>
          );
        }
      }
    }
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>
          <WarningRoundedIcon />
          &nbsp;&nbsp;
          <strong>빈 방입니다</strong>
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(RoomMoreInfoDialog);
