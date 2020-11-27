import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import RestaurantInfoDialog from "./Restaurant/RestaurantInfoDialog";

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
      infoOpen: false,
    };
    this.restaurantInfoOpen = this.restaurantInfoOpen.bind(this);
  }

  // 정보 창을 열고 닫는 메소드
  restaurantInfoOpen = () => {
    this.setState({
      infoOpen: true,
    });
  };
  restaurantInfoClose = () => {
    this.setState({
      infoOpen: false,
    });
  };

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
              style={this.props.data.Available ? green : red}
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
            >
              <Grid
                item
                xs
                alignContent="flex-start"
                alignItems="flex-start"
                justify="flex-start"
                align="center"
              >
                <img
                  src="/image/basicImage"
                  style={{ width: "128px", height: "128px" }}
                />
                <Typography align="center" gutterBottom variant="subtitle1">
                  {this.props.data.Restaurant_Name}
                </Typography>
                <Typography align="center" variant="body2" gutterBottom>
                  {this.props.data.Open_Time.slice(undefined, 5)} &nbsp;~&nbsp;{" "}
                  {this.props.data.Close_Time.slice(undefined, 5)}
                </Typography>
              </Grid>
              <Grid item container justify="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.restaurantInfoOpen}
                >
                  상세 정보
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <RestaurantInfoDialog
          open={this.state.infoOpen}
          data={this.props.data}
          dialogClose={this.restaurantInfoClose}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(ViewRestaurant);
