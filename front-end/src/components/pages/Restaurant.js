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
import RestaurantInfoRow from "../Restaurant/RestaurantInfoRow";
import RestaurantAddDialog from "../Restaurant/RestaurantAddDialog";
import ViewRestaurant from "../ViewRestaurant";

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

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      page: 0,
      rowsPerPage: 10,
      addRestaurantIsOpen: false,
      searchRestaurantIsOpen: false,
      Hotel_ID: "",
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.callSearchApi = this.callSearchApi.bind(this);
    this.addRestaurantBtnOnclick = this.addRestaurantBtnOnclick.bind(this);
    this.closeAddDialog = this.closeAddDialog.bind(this);
    this.setTableOnSearch = this.setTableOnSearch.bind(this);
    this.getRestaurant = this.getRestaurant.bind(this);
    this.fordebug = this.fordebug.bind(this);
    this.callSearchApi(); 
  }

  componentDidMount() {
    this.props.checkPermission();
    this.refreshSearchTable(); 
  }

  refreshSearchTable = async() => {
    this.setState({
      restaurants: [],
    });
    const newRestaurants = await this.callSearchApi();
    console.log(newRestaurants);
    this.setState({
      restaurants: newRestaurants
    })
  };

  setTableOnSearch = (arr) => {
    this.setState({
      restaurants: arr,
    });
  };

  async callSearchApi() {
    const formData = new FormData();
    const url = "/facility/restaurantInforms";
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
  addRestaurantBtnOnclick = () => {
    console.log("예약 추가버튼 눌림");
    this.setState({ addRestaurantIsOpen: true });
    console.log(this.state);
  };

  closeAddDialog = () => {
    console.log("값이 변경됨");
    this.setState({ addRestaurantIsOpen: false });
    console.log(this.state);
  };

  searchRestaurantBtnOnclick = () => {
    this.refreshSearchTable();
  };

  closeSearchDialog = () => {
    this.setState({ searchRestaurantIsOpen: false });
  };

  getRestaurant = () => {
    return this.state.restaurants;
  };

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  fordebug = () => {
    console.log(this.state.restaurants);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} idx={0} />
        <h1 align="center" style={{background:"lightblue"}}><strong>호텔 레스토랑 관리 페이지입니다.</strong></h1>
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

              <IconButton aria-label="Add" onClick={this.addRestaurantBtnOnclick}>
                <AddBox />
              </IconButton>
              <div>
              <RestaurantAddDialog
                open={this.state.addRestaurantIsOpen}
                closeDialog={this.closeAddDialog}
                refreshTable={this.refreshSearchTable}
              />
              </div>
{/* 
              <IconButton aria-label="Refresh" onClick={this.refreshTable}>
                <Refresh />

              </IconButton> */}
            </form>
            <div className={classes.body}>
              <Grid container spacing={5} justify="center">
                {this.state.restaurants.map((c) => {
                  return (
                    <Grid item xs={6} sm={6} md={3} lg={2}>
                      <ViewRestaurant data={c} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
      </div>
    );
  }
}

export default withStyles(styles)(Restaurant);
