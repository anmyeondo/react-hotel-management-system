import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
// import OrderAddDialog from "../Order/OrderAddDialog";
// import OrderSearchDialog from "../Order/OrderSearchDialog";
import OrderInfoRow from "../Order/OrderInfoRow";
import Header from "./Header";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import Refresh from "@material-ui/icons/Refresh";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      page: 0,
      rowsPerPage: 10,
      addOrderIsOpen: false,
      searchOrderIsOpen: false,
      isDone: false,
      isAssigned: false,
      Hotel_ID: "",
    };
    this.moreOpen = false;
    this.assignedOpen = false;
    this.callApi = this.callApi.bind(this);
    this.addOrderBtnOnclick = this.addOrderBtnOnclick.bind(this);
    this.closeAddDialog = this.closeAddDialog.bind(this);
    this.setTableOnSearch = this.setTableOnSearch.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.callSearchApi = this.callSearchApi.bind(this);
  }

  componentDidMount() {
    this.props.checkPermission();
    this.callApi();
    setInterval(this.refreshTable, 5000);
  }

  refreshTable = () => {
    if(this.moreOpen || this.assignedOpen) {
      ;
    }
    else {
      this.setState({
        orders: [],
      });
      this.callApi();
    }
  };

  setTableOnSearch = (arr) => {
    this.setState({
      orders: arr,
    });
  };

  callApi = () => {
    axios({
      method: "get",
      url: "/orders/informs",
    }).then((res) => {
      this.setState({
        orders: res.data,
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
  addOrderBtnOnclick = () => {
    console.log("Order.js 버튼 눌림");
    this.setState({ addOrderIsOpen: true });
    console.log(this.state);
  };

  closeAddDialog = () => {
    console.log("값이 변경됨");
    this.setState({ addOrderIsOpen: false });
    console.log(this.state);
  };

  searchOrderBtnOnclick = () => {
    this.setState({ searchOrderIsOpen: true });
    this.getOrder();
  };

  closeSearchDialog = () => {
    this.setState({ searchOrderIsOpen: false });
  };

  getOrder = () => {
    return this.state.orders;
  };

  refreshSearchTable = async () => {
    this.setState({
      orders: [],
    });
    this.callSearchApi();
  };

  setTableOnSearch = (arr) => {
    this.setState({
      orders: arr,
    });
  };

  callSearchApi = () => {
    axios({
      method: "post",
      url: "/orders/searchOrder",
      data: {
        Hotel_ID: this.state.Hotel_ID,
        Is_Done: this.state.isDone,
        IsAssigned: this.state.isAssigned,
      },
    }).then((res) => {
      this.setState({ orders: res.data });
    });
  };

  changecbox1 = () => {
    if (this.state.isDone === true) {
      this.setState({
        isDone: false,
      });
    } else {
      this.setState({
        isDone: true,
      });
    }
  };

  changecbox2 = () => {
    if (this.state.isAssigned === true) {
      this.setState({
        isAssigned: false,
      });
    } else {
      this.setState({
        isAssigned: true,
      });
    }
  };

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  fordebug = () => {
    console.log(this.state);
  };
  getOpened = (more, assigned) => {
    this.moreOpen = more;
    this.assignedOpen = assigned;

    console.log(more, assigned)
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header checkPermission={this.props.checkPermission} idx={0} />
        <h1 align="center"><strong>Order Management Page</strong></h1>
        <hr />
        <br />
        <div align="center">
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value={this.state.isDone}
                onClick={this.changecbox1}
              />
            }
            label="완료 유무"
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                value={this.state.isAssigned}
                onClick={this.changecbox2}
              />
            }
            label="배정 유무"
            labelPlacement="start"
          />
          &nbsp;
          <IconButton aria-label="Search" onClick={this.refreshSearchTable}>
            <Search />
          </IconButton>
          &nbsp;&nbsp;
          <IconButton aria-label="Refresh" onClick={this.refreshTable}>
            <Refresh />
          </IconButton>
        </div>
        <Divider />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.table}>
                <TableCell className={classes.tablecelling}>
                  <strong>주문 번호</strong>
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  <strong>주문 위치</strong>
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  <strong>주문 시각</strong>
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  배정 직원
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  완료 상태
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  <strong>&nbsp;&nbsp;&nbsp;요청 사항</strong>
                </TableCell>
                <TableCell align="center">
                  <strong style={{ color: "black" }}>배정</strong>
                </TableCell>
                <TableCell align="center">
                  <strong style={{ color: "red" }}>삭제</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.orders
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map((c) => {
                  return (
                    <OrderInfoRow data={c} refreshTable={this.refreshTable} getOpened={this.getOpened} />
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={this.state.orders.length}
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

export default withStyles(styles)(Orders);
