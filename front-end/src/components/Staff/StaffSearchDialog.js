import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
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

class StaffSearchDialog extends React.Component {
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
      url: "/staffs/search",
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
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle> 직원 검색</DialogTitle>
        <DialogContent>
            <strong>소속 호텔</strong>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Select
                  id="HOTEL_Name"
                  name="HOTEL_Name"
                  value={this.state.HOTE_Name}
                  onChange={this.handleValueChange}
            >
                  <MenuItem value={"Deluna"}>Deluna</MenuItem>
                  <MenuItem value={"BaeJJang"}>BaeJJang</MenuItem>
                  <MenuItem value={"Heaven"}>Heaven</MenuItem>
          </Select>
          <br />
          <br />
          <TextField
            label="이름(First_Name)"
            type="text"
            name="First_Name"
            value={this.state.First_Name}
            onChange={this.handleValueChange}
          />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <TextField
            label="성(Last_Name)"
            type="text"
            name="Last_Name"
            value={this.state.Last_Name}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          <br />
          <strong>소속 부서 : </strong>
          &nbsp; &nbsp; &nbsp;
              <Select
                id="Dept_Name"
                name="Dept_Name"
                value={this.state.Dept_Name}
                onChange={this.handleValueChange}
              >
              <MenuItem value={"관리"}>관리</MenuItem>
              <MenuItem value={"마케팅"}>마케팅</MenuItem>
              <MenuItem value={"식음료"}>식음료</MenuItem>
              <MenuItem value={"개발1팀"}>개발1팀</MenuItem>
              <MenuItem value={"개발2팀"}>개발2팀</MenuItem>
              <MenuItem value={"청소"}>청소</MenuItem>
              <MenuItem value={"자재관리"}>자재관리</MenuItem>
              <MenuItem value={"IT관리"}>IT관리</MenuItem>
              <MenuItem value={"서비스"}>서비스</MenuItem>
              </Select>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <strong>직급 :</strong> &nbsp;&nbsp;&nbsp;&nbsp;
              <Select
                id="Rank"
                name="Rank"
                value={this.state.Rank}
                onChange={this.handleValueChange}
              >
              <MenuItem value={"계약직"}>계약직</MenuItem>
              <MenuItem value={"정규직"}>정규직</MenuItem>
              <MenuItem value={"매니저"}>매니저</MenuItem>
              <MenuItem value={"총괄 감독"}>총괄 감독</MenuItem>
              <MenuItem value={"CEO"}>CEO</MenuItem>
              </Select>


          <br />
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

export default withStyles(styles)(StaffSearchDialog);
