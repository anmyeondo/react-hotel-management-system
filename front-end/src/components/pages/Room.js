import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import ViewRoom from "../ViewRoom";
import SelectFloor from "../../modules/SelectFloor";
import Header from "./Header";

const styles = (theme) => ({
  body: {
    margin: "30px",
  },
});

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: [],
      floor: 200,
      reservation: [],
      moreInfoisOpen: false,
    };

    this.getRoomInfo = this.getRoomInfo.bind(this);
    this.getRoomRes = this.getRoomRes.bind(this);
  }


  getRoomInfo = async (value) => {
    await axios({
      method: "post",
      url: "/rooms/informs",
      data: { floor: value.value },
    }).then((res) => {
      this.setState({
        floor: value.value,
        room: res.data,
      });
    });

    this.getRoomRes(value)
    
  };

  getRoomRes = async (value) => {
    await axios({
      method: "post",
      url: "/rooms/reservations",
      data: {floor: value.value},
    }).then((res) => {
      this.setState({
        reservation: res.data,
      });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} />
        <h1 align="center" style={{ background: "#fefbd8" }}>
          <strong>호텔 방 관리 페이지</strong>
        </h1>
        <hr />
        <Grid item xs={1}>
          <SelectFloor getRoomInfo={this.getRoomInfo}/>
        </Grid>
        <div className={classes.body}>
          <Grid container spacing={5} justify="center">
            {this.state.room.map((c) => {
              return (
                <Grid item xs={6} sm={6} md={3} lg={2}>
                  <ViewRoom data={c} reservation={this.state.reservation} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Room);
