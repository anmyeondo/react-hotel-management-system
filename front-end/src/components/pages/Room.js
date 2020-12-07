import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import Search from "@material-ui/icons/Search";
import axios from "axios";
import ViewRoom from "../ViewRoom";
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
      hotel: "",
      floor: "",
      reservation: [],
      moreInfoisOpen: false,
    };
  }

  refreshSearchTable = async () => {
    await this.setState({
      room: [],
    });
    await this.getRoomInfo();
  };

  getRoomInfo = async () => {
    await axios({
      method: "post",
      url: "/rooms/informs",
      data: {
        hotel: this.state.hotel,
        floor: this.state.floor,
      },
    }).then((res) => {
      this.setState({
        room: res.data,
      });
    });

    this.getRoomRes();
  };

  getRoomRes = async () => {
    await axios({
      method: "post",
      url: "/rooms/reservations",
      data: {
        hotel: this.state.hotel,
        floor: this.state.floor,
      },
    }).then((res) => {
      this.setState({
        reservation: res.data,
      });
    });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} />
        <h1 align="center"><strong>Room Management Page</strong></h1>
        <hr />
        <div align="center">
          호텔: &nbsp;&nbsp;&nbsp;
          <Select
            id="hotel"
            name="hotel"
            value={this.state.hotel}
            onChange={this.handleValueChange}
          >
            &nbsp;&nbsp;&nbsp;
            <MenuItem value={"1"}>Deluna</MenuItem>
            <MenuItem value={"2"}>BaeJJang</MenuItem>
            <MenuItem value={"3"}>Heaven</MenuItem>
          </Select>
          &nbsp;&nbsp;&nbsp;층 수: &nbsp;&nbsp;&nbsp;
          <Select
            id="floor"
            name="floor"
            value={this.state.floor}
            onChange={this.handleValueChange}
          >
            &nbsp;&nbsp;&nbsp;
            <MenuItem value={200}>2층</MenuItem>
            <MenuItem value={300}>3층</MenuItem>
            <MenuItem value={400}>4층</MenuItem>
            <MenuItem value={500}>5층</MenuItem>
            <MenuItem value={600}>6층</MenuItem>
            <MenuItem value={700}>7층</MenuItem>
            <MenuItem value={800}>8층</MenuItem>
          </Select>
          <IconButton aria-label="Search" onClick={this.refreshSearchTable}>
            <Search />
          </IconButton>
        </div>
        <div className={classes.body}>
          <Grid container spacing={5} justify="center">
            {this.state.room.map((c) => {
              return (
                <Grid item xs={6} sm={6} md={3} lg={2}>
                  <ViewRoom
                    data={c}
                    reservation={this.state.reservation}
                    hotel={this.state.hotel}
                  />
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
