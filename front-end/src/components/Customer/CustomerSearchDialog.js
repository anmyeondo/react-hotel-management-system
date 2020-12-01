import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import SelectRank from "./../../modules/SelectRank";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
      Last_Name: "",
      First_Name: "",
      Rank: "",
      Nationality: ""
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
  // MVP 등급 선택시 실행
  handleRankChange = (value) => {
    this.setState({ Rank: value });
  };
  searchCustomer() {
    return axios({
      method: "post",
      url: "/customers/search",
      data: {
        Last_Name: this.state.Last_Name,
        First_Name: this.state.First_Name,
        Rank: this.state.Rank,
        Nationality: this.state.Nationality
      },
    });
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle> 고객 검색</DialogTitle>
        <DialogContent>
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
            label="국적"
            type="text"
            name="Nationality"
            value={this.state.Nationality}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          멤버쉽 등급&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Select
                id="Rank"
                name="Rank"
                value={this.state.Rank}
                onChange={this.handleValueChange}
              >
              <MenuItem value={"REGULAR"}>REGULAR</MenuItem>
              <MenuItem value={"BRONZE"}>BRONZE</MenuItem>
              <MenuItem value={"SILVER"}>SILVER</MenuItem>
              <MenuItem value={"GOLD"}>GOLD</MenuItem>
              <MenuItem value={"Diamond"}>Diamond</MenuItem>
              <MenuItem value={"RED"}>RED</MenuItem>
              </Select>
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
