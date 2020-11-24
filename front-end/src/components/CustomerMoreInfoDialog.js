import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import CustomerInfoDialog from './CustomerInfoDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },

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
    width: 400,
  },
}));

class CustomerMoreInfoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      h_id: "",
      i_id: "",
      code: "",
      rank: "",
      bank: "",
      account: "",
      customer_pw: "",
      r_date: "",
      salary: "",
      is_able: 1,
      info: {},
      info_open: false,

    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.callApi = this.callApi.bind(this);
    this.handleInfoOpen = this.handleInfoOpen.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
    this.setInfo = this.setInfo.bind(this);
  }

  // Info dialog 관련 메서드
  handleInfoOpen() {
    this.setState({
      info_open: true,
    });
  }

  handleInfoClose() {
    this.setState({
      info_open: false,
    });
  }
  setInfo(data){
    this.setState({
      info: data
    });
  }

  sendData = async () => {
    const infoId = await axios({
      method: "post",
      url: "/users/addInform",
      data: this.state.info,
    }).then((res) => {
        return res.data.insertId;
    });
    return infoId;
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
      bank: "",
      account: "",
      customer_pw: "",
      r_date: "",
      salary: "",
      is_able: 1,
    });
    this.props.closeDialog();
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    this.setState({
      i_id: await this.sendData(),
    });

    await this.callApi()
      .then(() => {
        this.handleClose();
      })
      .then(() => {
        this.props.refreshTable();
      });
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

  async callApi() {
    await axios({
      method: "post",
      url: "/customers/addCustomer",
      data: {
        h_id: this.state.h_id,
        i_id: this.state.i_id,
        code: this.state.code,
        rank: this.state.rank,
        bank: this.state.bank,
        account: this.state.account,
        customer_pw: this.state.customer_pw,
        r_date: this.state.r_date,
        salary: this.state.salary,
        is_able: this.state.is_able,
      },
    });
  }

  render() {
    const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle> <strong>직원 상세정보</strong></DialogTitle>
        <DialogContent>
          <List className={classes.root}>
          <ListItem>
            <ListItemText primary="소속 호텔" secondary={this.props.data.HOTEL_Name} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemText primary="이름" secondary={this.props.data.Last_Name+this.props.data.First_Name}/>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
          <ListItemText primary="담당 부서" secondary={this.props.data.Dept_Name} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
          <ListItemText primary="직급" secondary={this.props.data.Rank} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
          <ListItemText primary="계정" secondary={this.props.data.Account} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
          <ListItemText primary="Phone" secondary={this.props.data.Phone_Number} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
          <ListItemText primary="이메일" secondary={this.props.data.E_Mail} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
          <ListItemText primary="우편번호" secondary={this.props.data.Zip} />
          </ListItem>
          <ListItem>
          <ListItemText primary="생일" secondary={this.props.data.Birthday} />
          </ListItem>
          <ListItem>
          <ListItemText primary="등록 일자" secondary={this.props.data.RegDate} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <Divider variant="inset" component="li" />
          <Divider variant="inset" component="li" />
        </List>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>
            닫기
          </Button>
        </DialogActions>
        <CustomerInfoDialog info={this.state.info_open} handleInfoClose={this.handleInfoClose} setInfo={this.setInfo}/>
      </Dialog>
      
    );
  }
}

export default withStyles(styles)(CustomerMoreInfoDialog);
