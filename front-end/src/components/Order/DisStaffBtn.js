import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

class DisStaffBtn extends Component {
  disStaff = async () => {
    await axios({
      method: "post",
      url: "/orders/disstaff",
      data: {
        hotel: this.props.data.Hotel_ID,
        order_id: this.props.data.Order_ID,
        staff_id: this.props.data.Staff_ID,
      },
    });

    this.props.refreshTable();
  };
  render() {
    return (
      <Button onClick={this.disStaff} color="secondary" variant="contained">
        배정해제
      </Button>
    );
  }
}

export default DisStaffBtn;
