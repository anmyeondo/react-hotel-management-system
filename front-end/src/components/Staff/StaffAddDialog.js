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
import StaffInfoDialog from "./StaffInfoDialog";
import ImageUpload from "../ImageUpload";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

class StaffAddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
      h_id: "",
      i_id: "",
      code: "",
      rank: "",
      bank: "",
      account: "",
      staff_pw: "",
      r_date: "2020-12-01",
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
  setInfo(data) {
    this.setState({
      info: data,
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
  };

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
      r_date: "2020-12-01",
      salary: "",
      is_able: 1,
      info: {},
      info_open: false,
      staff_image: null,
    });
    this.props.closeDialog();
  }

  handleImageAddClick = (images) => {
    this.setState({ staff_image: images });
  };

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
    const url = "/staffs/addStaff";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    formData.append("staff_image", this.state.staff_image);
    formData.append("h_id", this.state.h_id);
    formData.append("i_id", this.state.i_id);
    formData.append("code", this.state.code);
    formData.append("rank", this.state.rank);
    formData.append("bank", this.state.bank);
    formData.append("account", this.state.account);
    formData.append("staff_pw", this.state.staff_pw);
    formData.append("r_date", this.state.r_date);
    formData.append("salary", this.state.salary);
    formData.append("is_able", this.state.is_able);

    // FormData의 value 확인
    await axios.post(url, formData, config);
  }

  render() {
    const classes = makeStyles();
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {" "}
          <span>직원 추가</span>{" "}
        </DialogTitle>
        <DialogContent className={classes.dialogcss}>
              <ImageUpload updateImage={this.handleImageAddClick} />
              <br/>
              <br/>
              소속 호텔&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Select
                id="h_id"
                name="h_id"
                value={this.state.h_id}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;
              <MenuItem value={"1"}>Deluna</MenuItem>
              <MenuItem value={"2"}>BaeJJang</MenuItem>
              <MenuItem value={"3"}>Heaven</MenuItem>
              </Select>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              소속 부서&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Select
                id="code"
                name="code"
                value={this.state.code}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MenuItem value={"1000"}>관리</MenuItem>
              <MenuItem value={"1001"}>마케팅</MenuItem>
              <MenuItem value={"1002"}>식음료</MenuItem>
              <MenuItem value={"1003"}>개발1팀</MenuItem>
              <MenuItem value={"1004"}>개발2팀</MenuItem>
              <MenuItem value={"1005"}>청소</MenuItem>
              <MenuItem value={"1006"}>자재관리</MenuItem>
              <MenuItem value={"1007"}>IT관리</MenuItem>
              <MenuItem value={"1008"}>서비스</MenuItem>
              </Select>
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
            &nbsp;&nbsp;&nbsp;&nbsp;
          <br />
          <br />
          </form>
          <br />
            직급&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Select
                id="rank"
                name="rank"
                value={this.state.rank}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MenuItem value={"계약직"}>계약직</MenuItem>
              <MenuItem value={"정규직"}>정규직</MenuItem>
              <MenuItem value={"매니저"}>매니저</MenuItem>
              <MenuItem value={"총괄 감독"}>총괄 감독</MenuItem>
              <MenuItem value={"CEO"}>CEO</MenuItem>
              </Select>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              은행 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Select
                id="bank"
                name="bank"
                value={this.state.bank}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MenuItem value={"농협"}>농협</MenuItem>
              <MenuItem value={"신한"}>신한</MenuItem>
              <MenuItem value={"국민"}>국민</MenuItem>
              <MenuItem value={"우체국"}>우체국</MenuItem>
              <MenuItem value={"카카오뱅크"}>카카오뱅크</MenuItem>
              <MenuItem value={"기업"}>기업</MenuItem>
              <MenuItem value={"기타"}>기타</MenuItem>
              </Select>
          <br />
          <br />
          <TextField
            label="계좌(-을 제외하여 입력)"
            type="text"
            name="account"
            value={this.state.account}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          <TextField
            label="비밀번호(계정)"
            type="text"
            name="staff_pw"
            value={this.state.staff_pw}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          <TextField
            label="연봉(won)"
            type="text"
            name="salary"
            value={this.state.salary}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          배정가능 여부 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Select
                id="is_able"
                name="is_able"
                value={this.state.is_able}
                onChange={this.handleValueChange}
              >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MenuItem value={"0"}>불가능</MenuItem>
              <MenuItem value={"1"}>가능</MenuItem>
              </Select>
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
        <StaffInfoDialog
          info={this.state.info_open}
          handleInfoClose={this.handleInfoClose}
          setInfo={this.setInfo}
        />
      </Dialog>
    );
  }
}

export default withStyles(styles)(StaffAddDialog);
