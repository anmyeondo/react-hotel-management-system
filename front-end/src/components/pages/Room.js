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
    };
    this.getRoomInfo = this.getRoomInfo.bind(this);
  }

  getRoomInfo = async (value) => {
    await axios({
      method: "post",
      url: "/rooms/informs",
      data: { floor: value.value },
    }).then((res) => {
      this.setState({
        room: res.data,
      });
    });
    console.log(this.state.room);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} />
        <h1 align="center" style={{ background: "#fefbd8" }}>
          <strong>호텔 방 관리 페이지입니다.</strong>
        </h1>
        <hr />
        <Grid item xs={1}>
          <SelectFloor getRoomInfo={this.getRoomInfo} />
        </Grid>

        <div className={classes.body}>
          <Grid container spacing={10} xs={12} justify="center">
            {this.state.room.map((c) => {
              return (
                <Grid item justify="center">
                  <ViewRoom data={c} />
                </Grid>
              );
            })}
          </Grid>
        </div>
        {/* <Grid item>
            <ViewRoom RoomNumber={101} RoomType={'SILVER'} Personnel={5}/>
          </Grid>
          <Grid item>
            <ViewRoom RoomNumber={102} RoomType={'SILVER'} Personnel={5}/>
          </Grid>
          <Grid item>
            <ViewRoom RoomNumber={103} RoomType={'SILVER'} Personnel={5}/>
          </Grid>
          <Grid item>
            <ViewRoom RoomNumber={104} RoomType={'SILVER'} Personnel={5}/>
          </Grid>
          <Grid item>
            <ViewRoom RoomNumber={105} RoomType={'SILVER'} Personnel={5}/>
          </Grid>
          <Grid item>
            <ViewRoom RoomNumber={106} RoomType={'SILVER'} Personnel={5}/>
          </Grid> */}
      </div>
    );
  }
}
// {this.state.customers
//   .slice(
//     this.state.page * this.state.rowsPerPage,
//     this.state.page * this.state.rowsPerPage +
//       this.state.rowsPerPage
//   )
//   .map((c) => {
//     return (
//       <CustomerInfoRow
//         data={c}
//         refreshTable={this.refreshTable}
//       />
//     );
//   })}

export default withStyles(styles)(Room);
