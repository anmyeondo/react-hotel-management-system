import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 4000,
  },
  dialogcss: {
    align: "center",
  },
}));

class CourseAddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Course_Name: "",
      Restaurant_Name: "",
      Price_Won: 0,
      Appetizer: "",
      Main1: "",
      Main2: "",
      Dessert: "",
    };
  }

  handleClose = () => {
    this.setState({
      Course_Name: "",
      Restaurant_Name: "",
      Price_Won: 0,
      Appetizer: "",
      Main1: "",
      Main2: "",
      Dessert: "",
    });
    this.props.closeDialog();
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "/facility/addCourse",
      data: {
        Restaurant_Name: this.props.data.Restaurant_Name,
        Hotel_ID: this.props.data.Hotel_ID,
        Course_Name: this.state.Course_Name,
        Price_Won: this.state.Price_Won,
        Appetizer: this.state.Appetizer,
        Main1: this.state.Main1,
        Main2: this.state.Main2,
        Dessert: this.state.Dessert,
      },
    }).then(() => {
      this.handleClose();
    });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <span>코스 메뉴 추가</span>{" "}
        </DialogTitle>
        <DialogContent className={classes.dialogcss}>
          <TextField
            label="소유 호텔"
            type="text"
            name="Hotel_Name"
            value={this.props.data.HOTEL_Name}
            InputProps={{
              readOnly: true,
            }}
          />
          <br />
          <TextField
            label="레스토랑명"
            type="text"
            name="Restaurant_Name"
            value={this.props.data.Restaurant_Name}
            InputProps={{
              readOnly: true,
            }}
          />
          <br />
          <Divider />
          <br />
          <TextField
            label="코스 이름"
            type="text"
            name="Course_Name"
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="가격"
            type="text"
            name="Price_Won"
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="에피타이저"
            type="text"
            name="Appetizer"
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="메인 메뉴"
            type="text"
            name="Main1"
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="메인 메뉴"
            type="text"
            name="Main2"
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="디저트"
            type="text"
            name="Dessert"
            onChange={this.handleValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(CourseAddDialog);
