import React, { Component } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import SelectCountry from "../../modules/SelectCountry";
import Button from "@material-ui/core/Button";
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
      width: 400,
    },


}));

class StaffInfoDialog extends Component {
    constructor(props){
        super(props)
        this.state = {
            zip: "",
            aNum: "",
            fName: "",
            lName: "",
            eMail: "",
            fax: "",
            birthday: "1998-12-03",
            nationality: "",
            phoneNumber: "",
            gender: "",
          };
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClose = async () =>{
        this.props.setInfo(this.state);
        this.props.handleInfoClose();
    }

    handleNationChange = (value) => {
        this.setState({nationality: value});
    }
    
    render() {
        return (
            <Dialog open={this.props.info} style>
                <DialogTitle>개인정보</DialogTitle>
                <DialogContent>
                    <TextField
                        label="우편번호"
                        type="text"
                        name="zip"
                        value={this.state.zip}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <br/>
                    <TextField
                        label="상세주소"
                        type="text"
                        name="aNum"
                        value={this.state.aNum}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <br/>
                    <TextField
                        label="이름(First_Name)"
                        type="text"
                        name="fName"
                        value={this.state.fName}
                        onChange={this.handleValueChange}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                        label="성(Last_Name)"
                        type="text"
                        name="lName"
                        value={this.state.lName}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <br/>
                    <TextField
                        label="Email"
                        type="text"
                        name="eMail"
                        value={this.state.eMail}
                        onChange={this.handleValueChange}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                        label="Fax"
                        type="text"
                        name="fax"
                        value={this.state.fax}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <br/>

                    <TextField
                    label="생년월일"
                    id="birthday"
                    name="birthday"
                    type="date"
                    value={this.state.birthday}
                    // className={classes.textField}
                    onChange={this.handleValueChange}
                    />
                    <br/>
                    <br/>
                    <p>국가</p>
                    <SelectCountry changeCountry={this.handleNationChange}/>
                    <br/>
                    <TextField
                        label="전화번호"
                        type="text"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <strong>성별</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Select
                            id="gender"
                            name="gender"
                            value={this.state.gender}
                            onChange={this.handleValueChange}
                        >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <MenuItem value={"남자"}>남자</MenuItem>
                        <MenuItem value={"여자"}>여자</MenuItem>
                        </Select>
                </DialogContent>
                <DialogActions>
                    <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClose}
                    >
                        저장
                    </Button>
                </DialogActions>
          </Dialog>
        );
    }
}

export default withStyles(styles)(StaffInfoDialog);