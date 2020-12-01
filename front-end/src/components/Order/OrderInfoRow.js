import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import OrderMoreInfoDialog from "./OrderMoreInfoDialog";
import OrderDeleteBtn from "./OrderDeleteBtn";
import OrderAssigned from "./OrderAssigned";
import DisStaffBtn from "./DisStaffBtn";
import axios from "axios";

const Styles = (theme) => ({
  thirdary: {
    // This is green.A700 as hex.
    main: "#81c784",
  },
});

class OrderInfoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MoreInfoisOpen: false,
      OrderAssignedisOpen: false,
      is_done: 0,
    };
  }

  componentDidMount = () => {
    const nextState = this.props.data.Is_Done;
    this.setState({
      is_done: nextState,
    });
  };
  //Info
  closeMoreInfoDialog = () => {
    console.log("값이 변경됨");
    this.setState({ OrderMoreInfoisOpen: false });
    console.log(this.state);
  };

  InfoOrderBtnOnclick = () => {
    this.setState({ OrderMoreInfoisOpen: true });
    console.log(this.state);
  };

  //Assigned
  handleAssignedOpen = () => {
    this.setState({ OrderAssignedisOpen: true });
  };

  handleAssignedClose = () => {
    this.setState({ OrderAssignedisOpen: false });
  };

  closeOrderModifyDialog = () => {
    console.log("값이 변경됨");
    this.setState({ OrderModifyisOpen: false });
  };

  toggleValueChange = async (e) => {
    const nextState = !this.state.is_done;
    await this.setState({ is_done: nextState });
    console.log(this.state.is_done);
    await axios({
      method: "post",
      url: "/orders/isdone",
      data: {
        hotel: this.props.data.Hotel_ID,
        order_id: this.props.data.Order_ID,
        is_done: this.state.is_done,
      },
    });
    console.log(this.state.is_done);
  };

  render() {
    const { classes } = this.props;
    return (
      <TableRow align="center">
        <TableCell className={classes.tablecelling}>
          <strong style={{ textJustify: "center" }}>
            {this.props.data.Order_ID}
          </strong>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            <strong>{this.props.data.HOTEL_Name}</strong>{" "}
            {" " + this.props.data.Room_Num + "호"}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Order_Time}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Staff_ID < 0 ? (
              <span style={{ color: "red" }}>미지정</span>
            ) : (
              this.props.data.Last_Name +
              this.props.data.First_Name +
              "(" +
              this.props.data.Staff_ID +
              ")"
            )}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={this.state.is_done}
                onChange={this.toggleValueChange}
              />
            }
            labelPlacement="start"
          />
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <Button
            onClick={this.InfoOrderBtnOnclick}
            color="primary"
            variant="contained"
          >
            주문정보
          </Button>
        </TableCell>
        <TableCell align="center">
          {this.props.data.Staff_ID < 0 && (
            <Button
              color="primary"
              onClick={this.handleAssignedOpen}
              variant="contained"
            >
              배정
            </Button>
          )}
          {this.props.data.Staff_ID > 0 && (
            <DisStaffBtn
              data={this.props.data}
              refreshTable={this.props.refreshTable}
            />
          )}
        </TableCell>
        <TableCell align="center">
          <OrderDeleteBtn
            orderID={this.props.data.order_ID}
            refreshTable={this.props.refreshTable}
          />
        </TableCell>
        <OrderMoreInfoDialog
          data={this.props.data}
          open={this.state.OrderMoreInfoisOpen}
          closeDialog={this.closeMoreInfoDialog}
        />
        <OrderAssigned
          open={this.state.OrderAssignedisOpen}
          handleAssignedClose={this.handleAssignedClose}
          data={this.props.data}
          refreshTable={this.props.refreshTable}
        />
      </TableRow>
    );
  }
}

export default withStyles(Styles)(OrderInfoRow);
