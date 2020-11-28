import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import axios from "axios";
import ParkinglotModifyDialog from './Parkinglot/ParkinglotModifyDialog';

const styles = (theme) => ({
  paper: {
    backgroundColor: "white",
    border: "1px solid rgba(0, 0, 0, 0.20)",
    borderRadius: "8px",
    boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.20)",
  },
  header: {
    borderRadius: "8px 8px 0px 0px",
    overflow: "hidden",
    height: "20px",
  },
  footer: {
    margin: "20px",
  },
});

class ViewRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyParkingisOpen: false,
    }
  }

  handleModifyParkingOpen = async () => {
    console.log("Modify Open!");
    this.setState({
      modifyParkingisOpen: true,
    });

  };

  handleModifyParkingClose = () => {
    this.setState({
      modifyParkingisOpen: false,
    });
  };


  deleteParking = async() =>{
    await axios ({
        method: "get",
        url: "/facility/parkingdel",
        params: {
            ZONE: this.props.data.ZONE,
            Hotel_ID: this.props.data.Hotel_ID,
        }
    }).then(() => {
        this.props.refreshTable();
    });
  }

  render() {
    const { classes } = this.props;
    const red = { background: "red" };
    const green = { background: "green" };

    return (
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <div
              className={classes.header}
              style={this.props.data.Valet_Parking_is_Able ? green : red}
            ></div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid
              item
              container
              direction="column"
              spacing={2}
              className={classes.footer}
              style={{ maxWidth: "100%" }}
              align="center"
            >
                <Typography align="center" gutterBottom variant="subtitle1">
                  <strong><h1>{this.props.data.HOTEL_Name}</h1></strong>
                </Typography>
                <Typography align="center" variant="body2" gutterBottom>
                  <strong><h2>{"ZONE " + this.props.data.ZONE}</h2></strong>
                  <br/>
                </Typography>
                <Typography align="center" variant="body2" gutterBottom>
                  {"Capacity : " + this.props.data.Capacity}<br/>
                  {"Max_Height(m) : " + this.props.data.Max_Height_in_Meter}
                </Typography>
              <Grid
                item
                xs
                alignContent="flex-start"
                alignItems="flex-start"
                justify="flex-start"
                align="center"
              >
                <div>
                <IconButton>
                  <LocalParkingIcon/>
                </IconButton>
                <IconButton onClick={this.handleModifyParkingOpen}>
                  <PlaylistAddIcon/>
                </IconButton>
                <IconButton onClick={this.deleteParking}>
                  <Delete/>
                </IconButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
          <ParkinglotModifyDialog
              data={this.props.data}
              open={this.state.modifyParkingisOpen}
              closeDialog={this.handleModifyParkingClose}
              refreshTable={this.props.refreshTable}
          />
      </Paper>
    );
  }
}

export default withStyles(styles)(ViewRestaurant);
