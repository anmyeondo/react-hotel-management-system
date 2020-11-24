import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "../Header";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import Button from "@material-ui/core/Button";
import { Update } from "@material-ui/icons";
import CustomerSearchDialog from "../Customer/CustomerSearchDialog";
import CustomerInfoRow from "../Customer/CustomerInfoRow";
import CustomerAddDialog from "../Customer/CustomerAddDialog";

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

class Customer extends React.Component {
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
    this.getCustomer();
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
        <h1 align="center" style={{ background: "aquamarine" }}>
          <strong>호텔 손님 관리 페이지입니다.</strong>
        </h1>
        <hr />
        <div align="right">
          {/* <Button  
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.addCustomerBtnOnclick}
          >
            손님 추가
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.searchCustomerBtnOnclick}
          >
            손님 검색
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<Update />}
            onClick={this.refreshTable}
          >
            모든 손님 조회
          </Button>
        </div>
        {/* Dialog 표현 */}
        <CustomerAddDialog
          open={this.state.addCustomerIsOpen}
          closeDialog={this.closeAddDialog}
          refreshTable={this.refreshTable}
        />
        <CustomerSearchDialog
          data={this.state.customers}
          getCustomer={this.getCustomer}
          open={this.state.searchCustomerIsOpen}
          closeDialog={this.closeSearchDialog}
          setTableOnSearch={this.setTableOnSearch}
        />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.table}>
                <TableCell className={classes.tablecelling}>
                  <strong>이름</strong>
                </TableCell>
                <TableCell className={classes.tablecelling}>
                  <strong>국적</strong>
                </TableCell>
                <TableCell className={classes.tablecelling}>멤버쉽</TableCell>
                <TableCell className={classes.tablecelling}>마일리지</TableCell>
                <TableCell className={classes.tablecelling}>등록일자</TableCell>
                <TableCell className={classes.tablecelling}>
                  멤버쉽 만료일자
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
              {this.state.customers
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map((c) => {
                  return (
                    <CustomerInfoRow
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
            count={this.state.customers.length}
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

export default withStyles(styles)(Customer);
