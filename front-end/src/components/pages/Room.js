import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import ViewRoom from "../ViewRoom";
import HotelSelect from "../../modules/HotelSelect";
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
      hotel: {},
      floor: 200,
      reservation: [],
      moreInfoisOpen: false,
    };

  }

  getRoomInfo = async (value) => {
    await axios({
      method: "post",
      url: "/rooms/informs",
      data: { 
        hotel: this.state.hotel.value,
        floor: value.value 
      },
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
      data: {
        hotel: this.state.hotel.value,
        floor: value.value
      },
    }).then((res) => {
      this.setState({
        reservation: res.data,
      });
    });
  };

  getHotel = async (value) => {
    await this.setState({
      hotel: value
    })
    console.log(this.state.hotel)
  
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} />
        <h1 align="center" style={{ background: "#fefbd8" }}>
          <strong>호텔 방 관리 페이지</strong>
        </h1>
        <hr />
        <Grid container spacing={5}>
          <Grid item xs={2}>
            <HotelSelect getHotel={this.getHotel}></HotelSelect>
          </Grid>
          <Grid item xs={2}>
            <SelectFloor getRoomInfo={this.getRoomInfo}/>
          </Grid> 
        </Grid>
        <div className={classes.body}>
          <Grid container spacing={5} justify="center">
            {this.state.room.map((c) => {
              return (
                <Grid item xs={6} sm={6} md={3} lg={2}>
                  <ViewRoom data={c} reservation={this.state.reservation} hotel={this.state.hotel}/>
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
