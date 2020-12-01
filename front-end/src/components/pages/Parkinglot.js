import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
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
import AddBox from '@material-ui/icons/AddBox';
import Refresh from '@material-ui/icons/Refresh';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ViewParkinglot from "../ViewParkinglot";
import ParkinglotAddDialog from "../Parkinglot/ParkinglotAddDialog";

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
  body: {
    margin: "30px",
  },
});

class Parkinglot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkinglots: [],
      page: 0,
      rowsPerPage: 10,
      addParkinglotIsOpen: false,
      searchParkinglotIsOpen: false,
      Hotel_ID: ""
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.callSearchApi = this.callSearchApi.bind(this);
    this.addParkinglotBtnOnclick = this.addParkinglotBtnOnclick.bind(this);
    this.closeAddDialog = this.closeAddDialog.bind(this);
    this.setTableOnSearch = this.setTableOnSearch.bind(this);
    this.getParkinglot = this.getParkinglot.bind(this);
    this.fordebug = this.fordebug.bind(this);
    this.callSearchApi(); 
  }

  componentDidMount() {
    this.props.checkPermission();
    this.refreshSearchTable(); 
  }

  refreshSearchTable = async() => {
    this.setState({
      parkinglots: [],
    });
    const newParkinglots = await this.callSearchApi();
    console.log(newParkinglots);
    this.setState({
      parkinglots: newParkinglots
    })
  };

  setTableOnSearch = (arr) => {
    this.setState({
      parkinglots: arr,
    });
  };

  async callSearchApi() {
    const formData = new FormData();
    const url = "/facility/parkinglotInforms";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("Hotel_ID", this.state.Hotel_ID);
    const res = await axios.post(url, formData, config);
    console.log(res.data);
    return res.data;
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ RowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  // 버튼으로 Dialog를 조작하는 메소드
  addParkinglotBtnOnclick = () => {
    this.setState({ addParkinglotIsOpen: true });
    console.log(this.state);
  };

  closeAddDialog = () => {
    console.log("값이 변경됨");
    this.setState({ addParkinglotIsOpen: false });
    console.log(this.state);
  };

  searchParkinglotBtnOnclick = () => {
    this.refreshSearchTable();
  };

  closeSearchDialog = () => {
    this.setState({ searchParkinglotIsOpen: false });
  };

  getParkinglot = () => {
    return this.state.parkinglots;
  };

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  fordebug = () => {
    console.log(this.state.parkinglots);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} idx={0} />
        <h1 align="center" style={{background:"lightblue"}}><strong>호텔 주차장 관리 페이지입니다.</strong></h1>
        <div align="center">
          <form className={classes.container} noValidate>
              호텔 선택 : &nbsp; &nbsp;
              <Select
                id="Hotel_ID"
                name="Hotel_ID"
                value={this.state.Hotel_ID}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;
              <MenuItem value={"1"}>Deluna</MenuItem>
              <MenuItem value={"2"}>BaeJJang</MenuItem>
              <MenuItem value={"3"}>Heaven</MenuItem>
              <MenuItem value={""}>All</MenuItem>
              </Select>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <IconButton aria-label="Search" onClick={this.refreshSearchTable}>
                <Search />
              </IconButton>
              <IconButton aria-label="Add" onClick={this.addParkinglotBtnOnclick}>
                <AddBox />
              </IconButton>
            </form>
            <div>
            <ParkinglotAddDialog
              open={this.state.addParkinglotIsOpen}
              closeDialog={this.closeAddDialog}
              refreshTable={this.refreshSearchTable}
            />
            </div>
        </div>
            <div className={classes.body}>
              <Grid container spacing={5} justify="center">
                {this.state.parkinglots.map((c) => {
                  return (
                    <Grid item xs={6} sm={6} md={3} lg={2}>
                      <ViewParkinglot data={c} 
                      refreshTable = {this.refreshSearchTable}/>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
      </div>
    );
  }
}

export default withStyles(styles)(Parkinglot);
