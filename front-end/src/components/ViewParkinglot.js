import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(ViewRestaurant);
