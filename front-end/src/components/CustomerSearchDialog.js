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

class CustomerSearchDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      HOTEL_Name: "",
      First_Name: "",
      Last_Name: "",
      Dept_Name: "",
      Rank: "",
    });
    this.props.closeDialog();
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.searchCustomer().then((response) => {
      console.log(response.data);
      this.props.setTableOnSearch(response.data);
    });
    this.handleClose();
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
        HOTEL_Name: this.state.HOTEL_Name,
        First_Name: this.state.First_Name,
        Last_Name: this.state.Last_Name,
        Dept_Name: this.state.Dept_Name,
        Rank: this.state.Rank
      },
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle> 직원 검색</DialogTitle>
        <DialogContent>
          <TextField
            label="호텔이름"
            type="text"
            name="HOTEL_Name"
            value={this.state.HOTEL_Name}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="이름"
            type="text"
            name="First_Name"
            value={this.state.First_Name}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="성"
            type="text"
            name="Last_Name"
            value={this.state.Last_Name}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="담당부서"
            type="text"
            name="Dept_Name"
            value={this.state.Dept_Name}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="직급"
            type="text"
            name="Rank"
            value={this.state.Rank}
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
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(CustomerSearchDialog);
