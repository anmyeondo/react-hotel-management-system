import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import CustomerDeleteBtn from "./CustomerDeleteBtn";
import CustomerMoreInfoDialog from "./CustomerMoreInfoDialog";
import CustomerModifyDialog from "./CustomerModifyDialog";

const Styles = (theme) => ({
  tablecelling: {},
});

class CustomerInfoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomerMoreInfoisOpen: false,
      CustomerModifyisOpen: false,
    };
    this.closeMoreInfoDialog = this.closeMoreInfoDialog.bind(this);
    this.InfoCustomerBtnOnclick = this.InfoCustomerBtnOnclick.bind(this);
    this.ModifyCustomerBtnOnClick = this.ModifyCustomerBtnOnClick.bind(this);
    this.closeCustomerModifyDialog = this.closeCustomerModifyDialog.bind(this);
  }

  // 상세정보
  closeMoreInfoDialog = () => {
    console.log("값이 변경됨");
    this.setState({ CustomerMoreInfoisOpen: false });
    console.log(this.state);
  };

  InfoCustomerBtnOnclick = () => {
    this.setState({ CustomerMoreInfoisOpen: true });
    console.log(this.state);
  };

  // 수정
  ModifyCustomerBtnOnClick = () => {
    this.setState({ CustomerModifyisOpen: true });
  };

  closeCustomerModifyDialog = () => {
    this.setState({ CustomerModifyisOpen: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell className={classes.tablecelling}>
          <strong style={{ textJustify: "center" }}>
            {this.props.data.Last_Name + this.props.data.First_Name}
          </strong>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <strong style={{ textJustify: "center" }}>
            {this.props.data.Nationality}
          </strong>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>{this.props.data.Rank}</span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Mileage}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Reg_Date.slice(undefined, 10)}
          </span>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <span style={{ textJustify: "center" }}>
            {this.props.data.Membership_Due_Date.slice(undefined, 10)}
          </span>
        </TableCell>

        <TableCell align="center">
          <Button
            onClick={this.ModifyCustomerBtnOnClick}
            color="primary"
            variant="contained"
          >
            수정
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={this.InfoCustomerBtnOnclick}
            color="primary"
            variant="contained"
          >
            상세정보
          </Button>
        </TableCell>
        <TableCell align="center">
          <CustomerDeleteBtn
            customerID={this.props.data.ID}
            infoID={this.props.data.Inform_ID}
            refreshTable={this.props.refreshTable}
          />
        </TableCell>
        <CustomerMoreInfoDialog
          data={this.props.data}
          open={this.state.CustomerMoreInfoisOpen}
          closeDialog={this.closeMoreInfoDialog}
        />
        <CustomerModifyDialog
          data={this.props.data}
          open={this.state.CustomerModifyisOpen}
          closeDialog={this.closeCustomerModifyDialog}
          refreshTable={this.props.refreshTable}
        />
      </TableRow>
    );
  }
}

export default withStyles(Styles)(CustomerInfoRow);
