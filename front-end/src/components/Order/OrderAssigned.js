import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AssignedInfoRow from "./AssignedInfoRow";
import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    minWidth: 500,
    minHeight: 400,
  },
  tablecelling: {
    align: "center",
  },
  table: {
    maxWidth: 500,
  },
});

class OrderAssigned extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      department_code: 0,
      department_name: "",
      dept_staff: [],
      rowsPerPage: 5,
      page: 0,
      is_done: 0,
      staff_id: 0,
    };
  }

  componentDidMount() {
    this.getDepartCode();
    this.getStaffs(0);
  }

  getDepartCode = async () => {
    await axios({
      method: "post",
      url: "/orders/departments",
      data: {
        hotel: this.props.data.Hotel_ID,
      },
    }).then((res) => {
      this.setState({
        departments: res.data,
      });
    });
  };

  getStaffs = async (department_code) => {
    await axios({
      method: "post",
      url: "/orders/staffInforms",
      data: {
        hotel: this.props.data.Hotel_ID,
        code: department_code,
      },
    }).then((res) => {
      this.setState({
        dept_staff: res.data,
      });
    });
  };

  pushData = async () => {
    await axios({
      method: "post",
      url: "/orders/assign",
      data: {
        hotel: this.props.data.Hotel_ID,
        order_id: this.props.data.Order_ID,
        staff_id: this.state.staff_id,
      },
    });
  };

  assignStaff = async (id) => {
    await this.setState({
      staff_id: id,
    });

    await this.pushData();
  };

  handleClose = () => {
    this.props.handleAssignedClose();
  };

  handleValueChange = async (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    await this.setState(nextState);
    await this.getStaffs(e.target.value);
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ RowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  render() {
    const { classes } = this.props;
    var paging = false;

    if (this.state.dept_staff.length >= 5) paging = true;

    return (
      <Dialog open={this.props.open}>
        <DialogTitle>
          {" "}
          <strong>담당 직원 배정</strong>
        </DialogTitle>
        <DialogContent>
          <div>
            부서 선택 : &nbsp; &nbsp;
            <Select
              id="department_code"
              name="department_code"
              value={this.state.department_code}
              onChange={this.handleValueChange}
            >
              {this.state.departments.map((c) => {
                return <MenuItem value={c.Code}>{c.Dept_Name}</MenuItem>;
              })}
            </Select>
          </div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tablecelling}>이름</TableCell>
                  <TableCell className={classes.tablecelling}>직급</TableCell>
                  <TableCell className={classes.tablecelling}>배정</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.dept_staff
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map((c) => {
                    return (
                      <AssignedInfoRow
                        data={c}
                        refreshTable={this.props.refreshTable}
                        assignStaff={this.assignStaff}
                        handleClose={this.handleClose}
                      />
                    );
                  })}
              </TableBody>
            </Table>
            {paging && (
              <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={this.state.dept_staff.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            )}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(OrderAssigned);
