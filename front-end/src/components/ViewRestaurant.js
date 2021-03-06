import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import RestaurantInfoDialog from "./Restaurant/RestaurantInfoDialog";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Delete from "@material-ui/icons/Delete";
import axios from "axios";

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
    this.restaurantInfoClose = this.restaurantInfoClose.bind(this);
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
    this.props.refreshSearchTable();
  };

  // 삭제 메소드
  deleteRestaurant = () => {
    axios({
      method: "post",
      url: "/facility/delRestaurant",
      data: {
        Hotel_ID: this.props.data.Hotel_ID,
        Restaurant_Name: this.props.data.Restaurant_Name,
        Restaurant_Img: this.props.data.Restaurant_Img,
      },
    }).then((res) => {
      this.props.refreshSearchTable();
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
                  src={this.props.data.Restaurant_Img}
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
                <Button startIcon={<RestaurantIcon />}>
                  {/* 레스토랑 아이콘*/}
                </Button>
                <Button
                  // variant="outlined"
                  // color="primary"
                  onClick={this.restaurantInfoOpen}
                  startIcon={<PlaylistAddIcon />}
                >
                  {/* 상세 정보 */}
                </Button>
                <Button
                  // variant="outlined"
                  // color="primary"
                  onClick={this.deleteRestaurant}
                  startIcon={<Delete />}
                >
                  {/* 삭제 */}
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
