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
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import Button from "@material-ui/core/Button";
import { Update } from "@material-ui/icons";
import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker";
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddBox from '@material-ui/icons/AddBox';

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

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      page: 0,
      rowsPerPage: 10,
      addStaffIsOpen: false,
      searchStaffIsOpen: false,
      cin_date: "2020-11-24",
      cout_date: "2020-11-24",
      room_type: ""
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
        <h1 align="center" style={{background:"lightblue"}}><strong>호텔 예약 관리 페이지입니다.</strong></h1>
          <form className={classes.container} noValidate>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                id="r_date"
                name="r_date"
                label="체크인 날짜"
                type="date"
                defaultValue={this.state.cin_date}
                className={classes.textField}
                onChange={this.handleValueChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                id="r_date"
                name="r_date"
                label="체크아웃 날짜"
                type="date"
                defaultValue={this.state.cout_date}
                className={classes.textField}
                onChange={this.handleValueChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <strong><span>방 유형</span></strong>
              &nbsp;&nbsp;
              <Select
                labelId="Room_Type"
                id="Room_Type"
                // open={open}
                // onClose={handleClose}
                // onOpen={handleOpen}
                // onChange={handleChange}
              >
                <MenuItem value={"Single Room"}>Single Room</MenuItem>
                <MenuItem value={"Double Room"}>Double Room</MenuItem>
                <MenuItem value={"Special Room"}>Speical Room</MenuItem>
              </Select>
              &nbsp;&nbsp;&nbsp;

              <IconButton aria-label="Search">
                <Search />
              </IconButton>

              <IconButton aria-label="Refresh">
                <Refresh />
                onClick={this.refreshTable()}
              </IconButton>

              <IconButton aria-label="Add">
                <AddBox />
              </IconButton>
            </form>


        <Grid
          direction="row"
          justify="center"
          alignItems="center"
          
        ></Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Reservation);
