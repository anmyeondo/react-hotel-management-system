import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CourseAddDialog from "./CourseAddDialog";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },
}));

class OrderModifyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onAdd: false,
      Order_Name: "",
      Open_Time: "",
      Close_Time: "",
      Available: 0,
      course: [],
    };
  }

  // 초기 값 불러오기
  componentDidMount = () => {
    const nextState = this.props.Available;
    this.setState({
      Available: nextState,
    });
  };

  // Dialog 종료시 실행
  handleClose = () => {
    this.setState({
      onAdd: false,
      Order_Name: "",
      Open_Time: "",
      Close_Time: "",
      course: [],
    });
    this.props.closeDialog();
    this.props.RefreshTable();
  };

  // 수정버튼 클릭시 실행
  modifyBtnSubmit = async (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "/facility/modifyOrder",
      data: {
        Hotel_ID: this.props.data.Hotel_ID,
        Order_Name: this.props.data.Order_Name,
        Open_Time: this.state.Open_Time,
        Close_Time: this.state.Close_Time,
        Available: this.state.Available,
      },
    }).then((res) => {
      this.handleClose();
    });
  };

  // Course Add Dialog 설정
  onAddDialog = () => {
    this.setState({ onAdd: true });
  };
  offAddDialog = () => {
    this.setState({ onAdd: false });
  };

  // 스위치 클릭시 state 변경
  toggleValueChange = () => {
    const nextState = !this.state.Available;
    console.log(nextState);
    this.setState({ Available: nextState });
  };
  // 수정시 state 변경
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <strong>레스토랑 수정</strong>
        </DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.modifyBtnSubmit}
          >
            완료
          </Button>
          <Button variant="outlined" color="primary" onClick={this.onAddDialog}>
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
        <CourseAddDialog
          open={this.state.onAdd}
          data={this.props.data}
          closeDialog={this.offAddDialog}
        />
      </Dialog>
    );
  }
}

export default withStyles(styles)(OrderModifyDialog);
