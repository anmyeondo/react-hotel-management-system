import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class SearchTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      h_id: "",
      i_id: "",
      code: "",
      rank: "",
      // bank: "",
      // account: "",
      // staff_pw: "",
      // r_date: "",
      // salary: "",
      // is_able: "",
      open: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.searchCustomer = this.searchCustomer.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  onDateChange = () => {
    console.log("Changed data");
  };

  handleClose() {
    this.setState({
      h_id: "",
      i_id: "",
      code: "",
      rank: "",
      // bank: "",
      // account: "",
      // staff_pw: "",
      // r_date: "",
      // salary: "",
      // is_able: "",
      open: false,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.searchCustomer().then((response) => {
      console.log(response.data);
    });

    this.handleClose();
    this.props.refreshTable();
  }

  handleFileChange(e) {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  searchCustomer() {
    return axios({
      method: "post",
      url: "/users/test",
      data: {
        h_id: this.state.h_id,
        i_id: this.state.i_id,
        code: this.state.code,
        rank: this.state.rank,
        // bank: this.state.bank,
        // account: this.state.account,
        // staff_pw: this.state.staff_pw,
        // r_date: this.state.r_date,
        // salary: this.state.salary,
        // is_able: this.state.is_able,
      },
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          고객 검색하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle> 고객 검색</DialogTitle>
          <DialogContent>
            <TextField
              label="호텔번호"
              type="text"
              name="h_id"
              value={this.state.h_id}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="정보아이디"
              type="text"
              name="i_id"
              value={this.state.i_id}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="부서코드"
              type="text"
              name="code"
              value={this.state.code}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="등급"
              type="text"
              name="rank"
              value={this.state.rank}
              onChange={this.handleValueChange}
            />
            <br />

          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              검색
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(SearchTest);
