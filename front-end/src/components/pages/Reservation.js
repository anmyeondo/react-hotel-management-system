import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import Refresh from "@material-ui/icons/Refresh";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ReservationInfoRow from "../Reservation/ReservationInfoRow";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      page: 0,
      rowsPerPage: 10,
      addReservationIsOpen: false,
      searchReservationIsOpen: false,
      cin_date_start: "2020-12-01",
      cin_date_end: "2020-12-08",
      cout_date_start: "2020-12-01",
      cout_date_end: "2020-12-08",
      room_type: "",
      room_num: "",
      checkbox_cin: false,
      checkbox_cout: false,
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.callApi = this.callApi.bind(this);
    this.callSearchApi = this.callSearchApi.bind(this);
    this.addReservationBtnOnclick = this.addReservationBtnOnclick.bind(this);
    this.closeAddDialog = this.closeAddDialog.bind(this);
    this.setTableOnSearch = this.setTableOnSearch.bind(this);
    this.getReservation = this.getReservation.bind(this);
    this.changecbox1 = this.changecbox1.bind(this);
    this.changecbox2 = this.changecbox2.bind(this);
    this.fordebug = this.fordebug.bind(this);
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

  refreshSearchTable = async () => {
    this.setState({
      reservations: [],
    });
    const newReservations = await this.callSearchApi();
    console.log(newReservations);
    this.setState({
      reservations: newReservations,
    });
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
    // 기본설정
    const formData = new FormData();
    const url = "/reservations/searchReservation";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const check_in = {
      Start: this.state.cin_date_start,
      End: this.state.cin_date_end,
      Check: this.state.checkbox_cin,
    };
    const check_out = {
      Start: this.state.cout_date_start,
      End: this.state.cout_date_end,
      Check: this.state.checkbox_cout,
    };

    formData.append("Check_In", JSON.stringify(check_in));
    formData.append("Check_Out", JSON.stringify(check_out));
    formData.append("Room_Type", this.state.room_type);
    formData.append("Room_Num", this.state.room_num);

    const res = await axios.post(url, formData, config);
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
  addReservationBtnOnclick = () => {
    console.log("예약 추가버튼 눌림");
    this.setState({ addReservationIsOpen: true });
    console.log(this.state);
  };

  closeAddDialog = () => {
    console.log("값이 변경됨");
    this.setState({ addReservationIsOpen: false });
    console.log(this.state);
  };

  searchReservationBtnOnclick = () => {
    this.refreshSearchTable();
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

  changecbox1 = () => {
    if (this.state.checkbox_cin === true) {
      this.setState({
        checkbox_cin: false,
      });
    } else {
      this.setState({
        checkbox_cin: true,
      });
    }
  };

  changecbox2 = () => {
    if (this.state.checkbox_cout === true) {
      this.setState({
        checkbox_cout: false,
      });
    } else {
      this.setState({
        checkbox_cout: true,
      });
    }
  };

  fordebug = () => {
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} idx={0} />
        <h1 align="center"><strong>Reservation Management Page</strong></h1>
        <div align="center">
          <form className={classes.container} noValidate>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              id="cin_date_start"
              name="cin_date_start"
              label="체크인시작 날짜"
              type="date"
              value={this.state.cin_date_start}
              className={classes.textField}
              onChange={this.handleValueChange}
            />
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              id="cin_date_end"
              name="cin_date_end"
              label="체크인종료 날짜"
              type="date"
              defaultValue={this.state.cin_date_end}
              className={classes.textField}
              onChange={this.handleValueChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value={this.state.checkbox_cin}
                  onClick={this.changecbox1}
                />
              }
              label="상관없음"
              labelPlacement="start"
            />
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              id="cout_date_start"
              name="cout_date_start"
              label="체크아웃시작 날짜"
              type="date"
              value={this.state.cout_date_start}
              className={classes.textField}
              onChange={this.handleValueChange}
            />
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              id="cout_date_end"
              name="cout_date_end"
              label="체크아웃종료 날짜"
              type="date"
              defaultValue={this.state.cout_date_end}
              className={classes.textField}
              onChange={this.handleValueChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={this.state.checkbox_cout}
                  onClick={this.changecbox2}
                />
              }
              label="상관없음"
              labelPlacement="start"
            />
            <br />
            <br />
            <strong>
              <span>방 유형 : </span>
            </strong>
            &nbsp;&nbsp;&nbsp;
            <Select
              id="room_type"
              name="room_type"
              value={this.state.room_type}
              onChange={this.handleValueChange}
            >
              <MenuItem value={"Single"}>Single</MenuItem>
              <MenuItem value={"Double"}>Double</MenuItem>
              <MenuItem value={"Twin"}>Twin</MenuItem>
              <MenuItem value={"Triple"}>Triple</MenuItem>
              <MenuItem value={"Derux_Twin"}>Derux_Twin</MenuItem>
              <MenuItem value={"Ondol"}>Ondol</MenuItem>
              <MenuItem value={"Sweet"}>Sweet</MenuItem>
              <MenuItem value={""}>-</MenuItem>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              label="방 번호"
              type="text"
              id="room_num"
              name="room_num"
              value={this.state.room_num}
              onChange={this.handleValueChange}
            />
            <IconButton
              aria-label="Search"
              onClick={this.searchReservationBtnOnclick}
            >
              <Search />
            </IconButton>
            <IconButton aria-label="Refresh" onClick={this.refreshTable}>
              <Refresh />
            </IconButton>
          </form>
        </div>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.table}>
                <TableCell className={classes.tablecelling}>
                  <strong>예약 번호</strong>
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  <strong>손님 이름</strong>
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  <strong>방 번호</strong>
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  <strong>방 유형</strong>
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  체크인 날짜
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  체크아웃 날짜
                </TableCell>
                <TableCell align="center">
                  <strong style={{ color: "dimgray" }}>수정</strong>
                </TableCell>
                <TableCell align="center">
                  <strong style={{ color: "blue" }}>상세정보 조회</strong>
                </TableCell>
                <TableCell align="center">
                  <strong style={{ color: "red" }}>삭제</strong>
                </TableCell>
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
      </div>
    );
  }
}

export default withStyles(styles)(Reservation);
