import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import StaffInfoDialog from './StaffInfoDialog';
import { ImageSearch } from "@material-ui/icons";
import ImageUpload from "./ImageUpload";

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
    align: "center"
  },
}));

class StaffAddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: '',
      h_id: "",
      i_id: "",
      code: "",
      rank: "",
      bank: "",
      account: "",
      staff_pw: "",
      r_date: "",
      salary: "",
      is_able: 1,
      info: {},
      info_open: false,
      staff_image: null,
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
    this.handleImageAddClick = this.handleImageAddClick.bind(this);
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
      staff_pw: "",
      r_date: "",
      salary: "",
      is_able: 1,
    });
    this.props.closeDialog();
  }

  handleImageAddClick = (images) => {
    this.setState({ staff_image: images });
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
    const formData = new FormData();
    formData.append('staff_image', this.state.staff_image)
    formData.append('h_id', this.state.h_id)
    formData.append('i_id', this.state.i_id)
    formData.append('code', this.state.code)
    formData.append('rank', this.state.rank)
    formData.append('bank', this.state.bank)
    formData.append('account', this.state.account)
    formData.append('staff_pw',  this.state.staff_pw)
    formData.append('r_date', this.state.r_date)
    formData.append('salary', this.state.salary)
    formData.append('is_able', this.state.is_able)
    for (let key of formData.keys()) {
      console.log(key);
    }
    
    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(value);
    }
    await axios({
      method: "post",
      url: "/staffs/addStaff",

      data: {
        h_id: this.state.h_id,
        i_id: this.state.i_id,
        code: this.state.code,
        rank: this.state.rank,
        bank: this.state.bank,
        account: this.state.account,
        staff_pw: this.state.staff_pw,
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
        <DialogTitle> <span>고객 추가</span> </DialogTitle>
        <DialogContent className={classes.dialogcss}>
          <ImageUpload updateImage={this.handleImageAddClick}/>
          <form className={classes.container} noValidate>
           {/* 프로필 이미지 :<br /> <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> */}
           <br />
           <br />
            <TextField
              id="r_date"
              name="r_date"
              label="등록일자"
              type="date"
              value={this.state.r_date}
              className={classes.textField}
              onChange={this.handleValueChange}
            />
          </form>
          <TextField
            label="호텔번호"
            type="text"
            name="h_id"
            value={this.state.h_id}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="코드"
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
          <TextField
            label="은행"
            type="text"
            name="bank"
            value={this.state.bank}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="계좌"
            type="text"
            name="account"
            value={this.state.account}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="비번"
            type="text"
            name="staff_pw"
            value={this.state.staff_pw}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="연봉"
            type="text"
            name="salary"
            value={this.state.salary}
            onChange={this.handleValueChange}
          />
          <br />
          <TextField
            label="가능여부"
            type="text"
            name="is_able"
            value={this.state.is_able}
            onChange={this.handleValueChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleInfoOpen}
          >
            개인정보
          </Button>
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
        <StaffInfoDialog info={this.state.info_open} handleInfoClose={this.handleInfoClose} setInfo={this.setInfo}/>
      </Dialog>
      
    );
  }
}

export default withStyles(styles)(StaffAddDialog);
