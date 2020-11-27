import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import ReservationModifyDialog from './ReservationModifyDialog';
import ReservationMoreInfoDialog from './ReservationMoreInfoDialog';
import ReservationDeleteBtn from './ReservationDeleteBtn';

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
      MoreInfoisOpen: false,
      ReservationModifyisOpen: false,
    };
    this.closeMoreInfoDialog = this.closeMoreInfoDialog.bind(this);
    this.InfoReservationBtnOnclick = this.InfoReservationBtnOnclick.bind(this);
    this.ModifyReservationBtnOnclick = this.ModifyReservationBtnOnclick.bind(this);
    this.closeReservationModifyDialog = this.closeReservationModifyDialog.bind(this);
  }

  //Info
  closeMoreInfoDialog = () => {
    console.log("값이 변경됨");
    this.setState({ ReservationMoreInfoisOpen: false });
    console.log(this.state);
  };

  InfoReservationBtnOnclick = () => {
    this.setState({ ReservationMoreInfoisOpen: true });
    console.log(this.state);
  };

  //Modify
  ModifyReservationBtnOnclick = () => {
    console.log("test");
    this.setState({ ReservationModifyisOpen: true });
    console.log(this.state);
  };

  closeReservationModifyDialog = () => {
    console.log("값이 변경됨");
    this.setState({ ReservationModifyisOpen: false });
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
            {this.props.data.Last_Name + this.props.data.First_Name}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            <strong>{this.props.data.HOTEL_Name}</strong> {" " + this.props.data.Room_Num+"호"}
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
        <TableCell align='center'>
          <Button onClick={this.ModifyReservationBtnOnclick} color="primary" variant="contained" >
            수정
          </Button>
        </TableCell>
        <TableCell align='center'>
          <Button onClick={this.InfoReservationBtnOnclick} color="primary" variant="contained" >
            상세정보
          </Button>
        </TableCell>
        <TableCell align='center'>
          <ReservationDeleteBtn
              reservationID={this.props.data.Reservation_ID}
              refreshTable={this.props.refreshTable}
            />
        </TableCell>
        <ReservationMoreInfoDialog
          data={this.props.data}
          open={this.state.ReservationMoreInfoisOpen}
          closeDialog={this.closeMoreInfoDialog}
        />

        <ReservationModifyDialog
          data={this.props.data}
          open={this.state.ReservationModifyisOpen}
          closeDialog={this.closeReservationModifyDialog}
          refreshTable={this.props.refreshTable}
        /> 
      </TableRow>
    );
  }
}

export default withStyles(Styles)(ReservationInfoRow);
