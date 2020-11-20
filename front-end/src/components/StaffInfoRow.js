import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import StaffDeleteBtn from './StaffDeleteBtn'
import StaffMoreInfoDialog from './StaffMoreInfoDialog'
class StaffInfoRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StaffMoreInfoisOpen: false,
        }
        this.closeMoreInfoDialog = this.closeMoreInfoDialog.bind(this);
        this.InfoStaffBtnOnclick = this.InfoStaffBtnOnclick.bind(this);
    }


    closeMoreInfoDialog = () => {
        console.log("값이 변경됨");
        this.setState({ StaffMoreInfoisOpen: false });
        console.log(this.state);
    };

    InfoStaffBtnOnclick = () => {
        this.setState({ StaffMoreInfoisOpen: true });
        console.log(this.state);
    };
    
    render() {
        return (
        <TableRow>
            <TableCell>{this.props.data.Hotel_ID}</TableCell>
            <TableCell>{this.props.data.Last_Name+this.props.data.First_Name}</TableCell>
            <TableCell>{this.props.Inform_ID}</TableCell>
            <TableCell>{this.props.Rank}</TableCell>
            <TableCell>{this.props.Bank}</TableCell>
            <TableCell>{this.props.Account}</TableCell>
            <TableCell>{this.props.Salary}</TableCell>
            <TableCell>{this.props.RegDate}</TableCell>
            <TableCell align='center'><Button onClick={this.InfoStaffBtnOnclick} color="primary" variant="contained" >상세정보</Button></TableCell>
            <TableCell align='center'><StaffDeleteBtn ID={this.props.ID} refreshTable={this.props.refreshTable}/></TableCell> 
            <StaffMoreInfoDialog
                data = {this.props.data}
                open={this.state.StaffMoreInfoisOpen}
                closeDialog={this.closeMoreInfoDialog}
            />
        </TableRow>
        )
    }
}

export default StaffInfoRow;

