import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import StaffDeleteBtn from "./StaffDeleteBtn";
import StaffMoreInfoDialog from "./StaffMoreInfoDialog";
import { withStyles } from "@material-ui/core/styles";

const Styles = (theme) => ({
  tablecelling: {},
});

class StaffInfoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StaffMoreInfoisOpen: false,
    };
    this.closeMoreInfoDialog = this.closeMoreInfoDialog.bind(this);
    this.InfoStaffBtnOnclick = this.InfoStaffBtnOnclick.bind(this);
  }

  closeMoreInfoDialog = () => {
    console.log("값이 변경됨");
    this.setState({ StaffMoreInfoisOpen: false });
    console.log(this.state);
  };

  InfoStaffBtnOnclick = () => {
    this.setState({ StaffMoreInfoisOpen: true });
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell className={classes.tablecelling}>
          <strong style={{ textJustify: "center" }}>
            {this.props.data.HOTEL_Name}
          </strong>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Last_Name + this.props.data.First_Name}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Dept_Name}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>{this.props.data.Rank}</span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>{this.props.data.Bank}</span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Account}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Salary}
          </span>
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={this.InfoStaffBtnOnclick}
            color="primary"
            variant="contained"
          >
            상세정보
          </Button>
        </TableCell>
        <TableCell align="center">
          <StaffDeleteBtn
            staffID={this.props.data.Staff_ID}
            infoID={this.props.data.Inform_ID}
            refreshTable={this.props.refreshTable}
          />
        </TableCell>
        <StaffMoreInfoDialog
          data={this.props.data}
          open={this.state.StaffMoreInfoisOpen}
          closeDialog={this.closeMoreInfoDialog}
        />
      </TableRow>
    );
  }
}

export default withStyles(Styles)(StaffInfoRow);
