import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const Styles = theme => ({
  thirdary: {
    // This is green.A700 as hex.
    main: '#81c784',
  },
});

class ReservationInfoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StaffMoreInfoisOpen: false,
      StaffModifyisOpen: false,
    };
    this.closeMoreInfoDialog = this.closeMoreInfoDialog.bind(this);
    this.InfoStaffBtnOnclick = this.InfoStaffBtnOnclick.bind(this);
    this.ModifyStaffBtnOnclick = this.ModifyStaffBtnOnclick.bind(this);
    this.closeStaffModifyDialog = this.closeStaffModifyDialog.bind(this);
  }

  //Info
  closeMoreInfoDialog = () => {
    console.log("값이 변경됨");
    this.setState({ StaffMoreInfoisOpen: false });
    console.log(this.state);
  };

  InfoStaffBtnOnclick = () => {
    this.setState({ StaffMoreInfoisOpen: true });
    console.log(this.state);
  };

  //Modify
  ModifyStaffBtnOnclick = () => {
    console.log("test");
    this.setState({ StaffModifyisOpen: true });
    console.log(this.state);
  };

  closeStaffModifyDialog = () => {
    console.log("값이 변경됨");
    this.setState({ StaffModifyisOpen: false });
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell className={classes.tablecelling}>
          <strong style={{ textJustify: "center" }}>
            {this.props.data.Reservation_ID}
          </strong>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Customer_ID}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Room_Num}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Room_Type}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>{this.props.data.Check_In}</span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>{this.props.data.Check_Out}</span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Price_Won}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Pay_Date}
          </span>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(Styles)(ReservationInfoRow);
