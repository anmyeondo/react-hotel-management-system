import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const Styles = (theme) => ({
  thirdary: {
    // This is green.A700 as hex.
    main: "#81c784",
  },
});

class AssignedInfoRow extends React.Component {
  clickAssign = async () => {
    await this.props.assignStaff(this.props.data.Staff_ID);
    this.props.handleClose();
    this.props.refreshTable();
  };
  render() {
    const { classes } = this.props;
    return (
      <TableRow align="center">
        <TableCell className={classes.tablecelling}>
          {this.props.data.Last_Name + this.props.data.First_Name}
        </TableCell>
        <TableCell className={classes.tablecelling}>
          {this.props.data.Rank}
        </TableCell>
        <TableCell>
          <Button color="primary" onClick={this.clickAssign}>
            배정
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(Styles)(AssignedInfoRow);
