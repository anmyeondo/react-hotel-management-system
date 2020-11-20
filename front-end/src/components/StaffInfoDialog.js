import React, { Component } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios';

class Info extends Component {
    constructor(props){
        super(props)
        this.state = {
            zip: "",
            aNum: "",
            fName: "",
            lName: "",
            eMail: "",
            fax: "",
            birthday: "",
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
                    <TextField
                        label="상세주소"
                        type="text"
                        name="aNum"
                        value={this.state.aNum}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <TextField
                        label="이름"
                        type="text"
                        name="fName"
                        value={this.state.fName}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <TextField
                        label="성"
                        type="text"
                        name="lName"
                        value={this.state.lName}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <TextField
                        label="Email"
                        type="text"
                        name="eMail"
                        value={this.state.eMail}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <TextField
                        label="Fax"
                        type="text"
                        name="fax"
                        value={this.state.fax}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <TextField
                        label="생년월일"
                        type="text"
                        name="birthday"
                        value={this.state.birthday}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <TextField
                        label="국가"
                        type="text"
                        name="nationality"
                        value={this.state.nationality}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <TextField
                        label="전화번호"
                        type="text"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleValueChange}
                    />
                    <br/>
                    <TextField
                        label="성별"
                        type="text"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.handleValueChange}
                    />
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

export default Info;