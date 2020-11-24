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
import CustomerInfoRow from "../CustomerInfoRow";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import CustomerSearchDialog from "../CustomerSearchDialog";
import Button from "@material-ui/core/Button";
import { Update } from "@material-ui/icons";
import CustomerAddDialog from "../CustomerAddDialog";
import Grid from '@material-ui/core/Grid';


const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
    border: '3px solid black',
  },
  tablecelling: {
    align: "center"
  },
});

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      page: 0,
      rowsPerPage: 10,
      addStaffIsOpen: false,
      searchStaffIsOpen: false,
    };
    this.callApi = this.callApi.bind(this);
    this.addCustomerBtnOnclick = this.addCustomerBtnOnclick.bind(this);
    this.closeAddDialog = this.closeAddDialog.bind(this);
    this.setTableOnSearch = this.setTableOnSearch.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.callApi();
  }

  componentDidMount() {
    this.props.checkPermission();
    this.callApi();
  }

  refreshTable = () => {
    this.setState({
      customers: [],
    });
    this.callApi();
  };

  setTableOnSearch = (arr) => {
    this.setState({
      customers: arr,
    });
  };

  callApi = () => {
    axios({
      method: "get",
      url: "/customers/informs",
    }).then((res) => {
      this.setState({
        customers: res.data,
      });
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ RowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  // 버튼으로 Dialog를 조작하는 메소드
  addCustomerBtnOnclick = () => {
    console.log("Customer.js 버튼 눌림");
    this.setState({ addCustomerIsOpen: true });
    console.log(this.state);
  };

  closeAddDialog = () => {
    console.log("값이 변경됨");
    this.setState({ addCustomerIsOpen: false });
    console.log(this.state);
  };

  searchCustomerBtnOnclick = () => {
    this.setState({ searchCustomerIsOpen: true });
    this.getCustomer()
  };

  closeSearchDialog = () => {
    this.setState({ searchCustomerIsOpen: false });
  };

  getCustomer = () => {
    return this.state.customers;
  };

  render() {

    const { classes } = this.props;
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} idx={0} />
        <h1 align="center" style={{background:"mistyrose"}}><strong>호텔 직원 관리 페이지입니다.</strong></h1>

        <Grid
          direction="row"
          justify="center"
          alignItems="center"
          
        ></Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Room);
