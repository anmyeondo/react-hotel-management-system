import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "../Header";
import Paper from "@material-ui/core/Paper";
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
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
});

class Staff extends React.Component {
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
    this.addStaffBtnOnclick = this.addStaffBtnOnclick.bind(this);
    this.closeAddDialog = this.closeAddDialog.bind(this);
    this.setTableOnSearch = this.setTableOnSearch.bind(this);
  }

  componentDidMount() {
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
      url: "/staffs/informs",
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
  addStaffBtnOnclick = () => {
    console.log("Staff.js 버튼 눌림");
    this.setState({ addStaffIsOpen: true });
    console.log(this.state);
  };

  closeAddDialog = () => {
    console.log("값이 변경됨");
    this.setState({ addStaffIsOpen: false });
    console.log(this.state);
  };

  searchStaffBtnOnclick = () => {
    this.setState({ searchStaffIsOpen: true });
  };

  closeSearchDialog = () => {
    this.setState({ searchStaffIsOpen: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header idx={0} />
        <h3>호텔 직원 관리 페이지입니다.</h3>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.addStaffBtnOnclick}
          >
            직원 추가
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.searchStaffBtnOnclick}
          >
            직원 검색
          </Button>
        </div>
        {/* Dialog 표현 */}
        <StaffAddDialog
          open={this.state.addStaffIsOpen}
          closeDialog={this.closeAddDialog}
          refreshTable={this.refreshTable}
        />
        <StaffSearchDialog
          open={this.state.searchStaffIsOpen}
          closeDialog={this.closeSearchDialog}
          setTableOnSearch={this.setTableOnSearch}
        />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>호텔</TableCell>
                <TableCell>부서</TableCell>
                <TableCell>정보</TableCell>
                <TableCell>등급</TableCell>
                <TableCell>은행</TableCell>
                <TableCell>계좌</TableCell>
                <TableCell>월급</TableCell>
                <TableCell>등록일자</TableCell>
                <TableCell align="center"></TableCell>
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
                    <StaffInfoRow
                      key={c.ID}
                      ID={c.ID}
                      Hotel_ID={c.Hotel_ID}
                      Code={c.Code}
                      Inform_ID={c.Inform_ID}
                      Rank={c.Rank}
                      Bank={c.Bank}
                      Account={c.Account}
                      Salary={c.Salary}
                      RegDate={c.RegDate}
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

export default withStyles(styles)(Staff);
