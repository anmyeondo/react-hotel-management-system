import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import Button from "@material-ui/core/Button";
import { Update } from "@material-ui/icons";
import CustomerAddDialog from "../Customer/CustomerAddDialog";
import CustomerSearchDialog from "../Customer/CustomerSearchDialog";
import CustomerInfoRow from "../Customer/CustomerInfoRow";
import Header from "./Header";
import axios from "axios";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
    border: "3px solid black",
  },
  tablecelling: {
    align: "center",
  },
});

class AdminMain extends React.Component {
  render() {
    return (
       <div>
        <Header checkPermission={this.props.checkPermission} idx={0} />
        <img src="https://ifh.cc/g/waBuix.jpg" alt="Image" style={{width: "1920px", height: "901px"}}/>
      </div>
    );
  }
}

export default withStyles(styles)(AdminMain);
