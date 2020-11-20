import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "../Header";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import StaffInfoRow from "../StaffInfoRow";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import StaffSearchDialog from "../StaffSearchDialog";
import Button from "@material-ui/core/Button";
import { Update } from "@material-ui/icons";
import StaffAddDialog from "../StaffAddDialog";


const styles = (theme) => ({

});

class Circletest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} idx={0} />
        
      </div>
    );
  }
}

export default Circletest;
