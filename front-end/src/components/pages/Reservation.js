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
import Refresh from '@material-ui/icons/Refresh';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddBox from '@material-ui/icons/AddBox';
import ReservationInfoRow from "../Reservation/ReservationInfoRow";

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
      reservations: [],
      page: 0,
      rowsPerPage: 10,
      addReservationIsOpen: false,
      searchReservationIsOpen: false,
      cin_date: "2020-11-24",
      cout_date: "2020-11-24",
      room_type: "Regular"
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.fordebug = this.fordebug.bind(this);
    this.callApi = this.callApi.bind(this);
    this.callSearchApi = this.callSearchApi.bind(this);
    this.addReservationBtnOnclick = this.addReservationBtnOnclick.bind(this);
    this.closeAddDialog = this.closeAddDialog.bind(this);
    this.setTableOnSearch = this.setTableOnSearch.bind(this);
    this.getReservation = this.getReservation.bind(this);
    this.callApi();
  }

  componentDidMount() {
    this.props.checkPermission();
    this.callApi(); 
  }

  refreshTable = () => {
    this.setState({
      reservations: [],
    });
    this.callApi();
  };

  refreshSearchTable = () => {
    this.setState({
      reservations: [],
    });
    this.callSearchApi();
  };

  setTableOnSearch = (arr) => {
    this.setState({
      reservations: arr,
    });
  };

  callApi = () => {
    axios({
      method: "get",
      url: "/reservations/informs",
    }).then((res) => {
      this.setState({
        reservations: res.data,
      });
    });
  };

  async callSearchApi() {
    const formData = new FormData();
    const url = "/customers/addCustomer";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    formData.append("Check_In", this.state.cin_date);
    formData.append("Check_Out", this.state.cout_date);
    formData.append("Room_Type", this.state.room_type);

    // FormData의 value 확인
    await axios.post(url, formData, config);
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ RowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  // 버튼으로 Dialog를 조작하는 메소드
  addReservationBtnOnclick = () => {
    console.log("Customer.js 버튼 눌림");
    this.setState({ addReservationIsOpen: true });
    console.log(this.state);
  };

  closeAddDialog = () => {
    console.log("값이 변경됨");
    this.setState({ addReservationIsOpen: false });
    console.log(this.state);
  };

  searchCustomerBtnOnclick = () => {
    this.refreshSearchTable();
    // this.setState({ searchReservationIsOpen: true });
    // this.getReservation()
  };

  closeSearchDialog = () => {
    this.setState({ searchReservationIsOpen: false });
  };

  getReservation = () => {
    return this.state.reservations;
  };

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  fordebug = () => {
    console.log(this.state.cin_date);
    console.log(this.state.cout_date);
    console.log(this.state.room_type)
  }
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
                id="cin_date"
                name="cin_date"
                label="체크인 날짜"
                type="date"
                value={this.state.cin_date}
                className={classes.textField}
                onChange={this.handleValueChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                id="cout_date"
                name="cout_date"
                label="체크아웃 날짜"
                type="date"
                defaultValue={this.state.cout_date}
                className={classes.textField}
                onChange={this.handleValueChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <strong><span>방 유형 : </span></strong>
              &nbsp;&nbsp;
              <Select
                id="room_type"
                name="room_type"
                value={this.state.room_type}
                onChange={this.handleValueChange}
              >
              <MenuItem value={"Single Room"}>Single</MenuItem>
              <MenuItem value={"Double Room"}>Double</MenuItem>
              <MenuItem value={"Special Room"}>Speical</MenuItem>
              </Select>
              &nbsp;&nbsp;&nbsp;

              <IconButton aria-label="Search" onClick={this.searchCustomerBtnOnclick}>
                <Search />
              </IconButton>

              <IconButton aria-label="Refresh" onClick={this.refreshTable}>
                <Refresh />

              </IconButton>

              <IconButton aria-label="Add" onClick = {this.fordebug}>
                <AddBox />
              </IconButton>
            </form>


          <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead >  
              <TableRow className={classes.table}>
              <TableCell className={classes.tablecelling}><strong>예약 번호</strong></TableCell>
                <TableCell className={classes.tablecelling}><strong>손님 번호</strong></TableCell>
                <TableCell className={classes.tablecelling}><strong>방 번호</strong></TableCell>
                <TableCell className={classes.tablecelling}><strong>방 유형</strong></TableCell>
                <TableCell className={classes.tablecelling}>체크인 날짜</TableCell>
                <TableCell className={classes.tablecelling}>체크아웃 날짜</TableCell>
                <TableCell className={classes.tablecelling}>결제 가격</TableCell>
                <TableCell className={classes.tablecelling}>결제 일자</TableCell>
                {/* <TableCell className={classes.tablecelling}>월급</TableCell> */}
                {/* <TableCell align="center"><strong style={{color:"dimgray"}}>수정</strong></TableCell>
                <TableCell align="center"><strong style={{color:"blue"}}>상세정보 조회</strong></TableCell>
                <TableCell align="center"><strong style={{color:"red"}}>삭제</strong></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reservations
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                  this.state.rowsPerPage
                )
                .map((c) => {
                  return (
                    <ReservationInfoRow
                      data={c}
                      refreshTable={this.refreshTable}
                    />
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={this.state.reservations.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        {/* <Grid
          direction="row"
          justify="center"
          alignItems="center"
          
        ></Grid> */}
      </div>
    );
  }
}

export default withStyles(styles)(Reservation);
