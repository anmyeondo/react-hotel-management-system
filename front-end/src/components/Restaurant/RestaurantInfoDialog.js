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

class RestaurantInfoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info_open: false,
    };
  }

  // 종료 시 창 닫기
  closeDialog = () => {
    this.props.dialogClose();
  };

  render() {
    const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>레스토랑 상세정보</strong>
        </DialogTitle>
        <DialogContent>
          <List className={classes.root}>
            <ListItem>
              <img
                src="/image/basicImage"
                style={{ width: "128px", height: "128px" }}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText
                primary="소유 호텔"
                secondary={this.props.Hotel_Name}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText
                primary="가게명"
                secondary={this.props.data.Restaurant_Name}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText
                primary="영업시간"
                secondary={
                  this.props.data.Open_Time + " ~ " + this.props.data.Close_Time
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText
                primary="영업시간"
                secondary={
                  this.props.data.Open_Time + " ~ " + this.props.data.Close_Time
                }
              />
            </ListItem>
          </List>
        </DialogContent>
        {/* <DialogActions>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
        <CustomerInfoDialog
          info={this.state.info_open}
          handleInfoClose={this.handleInfoClose}
          setInfo={this.setInfo}
        />{" "}
        */}
      </Dialog>
    );
  }
}

export default withStyles(styles)(RestaurantInfoDialog);
