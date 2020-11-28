import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Clear from "@material-ui/icons/Clear";
import Done from "@material-ui/icons/DoneOutline";
import OrderMoreInfoDialog from "./OrderMoreInfoDialog";
import OrderDeleteBtn from "./OrderDeleteBtn";
import OrderAssigned from "./OrderAssigned";

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
    };
  }

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
    console.log(this.state);
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
          <Button
            onClick={this.InfoOrderBtnOnclick}
            color="primary"
            variant="contained"
          >
            주문정보
          </Button>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.data.Staff_ID === 0 ? (
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
          <span style={{ textJustify: "center" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.data.Is_Done === 0 ? <Clear /> : <Done />}
          </span>
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={this.handleAssignedOpen}
            color="primary"
            variant="contained"
          >
            배정하기
          </Button>
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